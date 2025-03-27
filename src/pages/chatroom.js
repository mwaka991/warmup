import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase";
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp, 
  doc, 
  getDoc, 
  setDoc, 
  deleteDoc, 
  limit, 
  where 
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../themes/ThemeContext";
import { Icon, ICON_TYPES } from "../components/IconLibrary";
import TypingIndicator from "../components/TypingIndicator";
import MessageBubble from "../components/MessageBubble";
import DateSeparator from '../components/DateSeparator';
import "./chatroom.css";

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const [currentUserAvatar, setCurrentUserAvatar] = useState("default_avatar");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState({});
  const typingTimeoutRef = useRef(null);
  const [replyingTo, setReplyingTo] = useState(null);

  // Define scrollToBottom function early - before any usage
  const scrollToBottom = (behavior = 'smooth') => {
    const messagesContainer = document.querySelector('.messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  };

  // Check authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("ChatRoom: User authenticated:", currentUser.email);
        setUser(currentUser);
      } else {
        console.log("ChatRoom: No authenticated user");
        // Redirect to login if not authenticated
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  // Fetch messages
  useEffect(() => {
    if (!user) {
      console.log("ChatRoom: Not fetching messages - no user");
      return; // Don't proceed if no user
    }

    console.log("ChatRoom: Setting up message listener for user:", user.email);
    const q = query(
      collection(db, 'messages'),
      orderBy('createdAt', 'asc'),
      limit(100)
    );
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
      setLoading(false);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, (error) => {
      console.error("ChatRoom: Error fetching messages:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Listen for typing indicators - FIXED to handle null user
  useEffect(() => {
    if (!user) {
      console.log("ChatRoom: Not setting up typing listener - no user");
      return; // Exit early if there's no user
    }

    console.log("ChatRoom: Setting up typing listener for user:", user.email);
    const typingCollectionRef = collection(db, 'typing');
    
    const unsubscribe = onSnapshot(typingCollectionRef, (snapshot) => {
      const typingData = {};
      snapshot.forEach((doc) => {
        // Filter out our own typing status and old typing statuses
        if (doc.id !== user.uid) { // This is safe now since we checked user exists
          const data = doc.data();
          if (data.timestamp && new Date() - data.timestamp.toDate() < 10000) {
            typingData[doc.id] = data;
          }
        }
      });
      setTypingUsers(typingData);
    }, (error) => {
      console.error("ChatRoom: Error listening to typing indicators:", error);
    });

    return () => unsubscribe();
  }, [user]); // Only depend on user object, not user.uid

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add this useEffect to fetch the current user's avatar
  useEffect(() => {
    // Don't put early returns inside useEffect body that could skip the hook entirely
    if (user) {
      const fetchCurrentUserAvatar = async () => {
        try {
          console.log("ChatRoom: Fetching avatar for user:", user.email);
          const userDoc = await getDoc(doc(db, 'userProfiles', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.avatarId) {
              setCurrentUserAvatar(userData.avatarId);
            }
          }
        } catch (error) {
          console.error("Error fetching current user avatar:", error);
        }
      };
      
      fetchCurrentUserAvatar();
    }
  }, [user]);

  // Cleanup typing status on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Clear any typing status when component unmounts
      if (user) {
        try {
          deleteDoc(doc(db, 'typing', user.uid)).catch(err => 
            console.error("Error clearing typing status on unmount:", err)
          );
        } catch (error) {
          console.error("Error in cleanup:", error);
        }
      }
    };
  }, [user]);

  // Handle typing indicator
  const handleTyping = async () => {
    if (!user) return; // Don't proceed if no user

    try {
      setIsTyping(true);
      await setDoc(doc(db, 'typing', user.uid), {
        displayName: user.displayName || 'Anonymous',
        timestamp: serverTimestamp()
      });

      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Set new timeout
      typingTimeoutRef.current = setTimeout(async () => {
        setIsTyping(false);
        if (user) { // Check user still exists before trying to clear
          await deleteDoc(doc(db, 'typing', user.uid)).catch(err => 
            console.error("Error clearing typing status:", err)
          );
        }
      }, 5000);
    } catch (error) {
      console.error("Error updating typing status:", error);
    }
  };

  // Handle reply to a specific message
  const handleReply = (message) => {
    setReplyingTo(message);
    // Focus the input field after setting reply
    setTimeout(() => {
      const inputField = document.querySelector('.message-input');
      if (inputField) inputField.focus();
    }, 0);
  };
  
  // Cancel reply
  const cancelReply = () => {
    setReplyingTo(null);
  };

  // Modify the sendMessage function to include reply information
  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    try {
      const messageData = {
        text: newMessage,
        createdAt: serverTimestamp(),
        uid: user?.uid,
        displayName: user?.displayName || 'Anonymous',
        photoURL: user?.photoURL || '',
        email: user?.email || ''
      };
      
      // If replying to a message, add reply metadata
      if (replyingTo) {
        messageData.replyTo = replyingTo.id;
        messageData.replyToUid = replyingTo.uid;
        messageData.replyToName = replyingTo.displayName || 'Anonymous';
        messageData.replyToText = replyingTo.text.length > 50 
          ? replyingTo.text.substring(0, 50) + '...' 
          : replyingTo.text;
      }
      
      await addDoc(collection(db, "messages"), messageData);
      setNewMessage('');
      setReplyingTo(null); // Clear the reply state after sending
      scrollToBottom('auto');
      
      // Delete typing indicator when message is sent
      if (typingTimeoutRef.current) {
        await deleteDoc(doc(db, "typing", user.uid));
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigate("/");
    }).catch(error => {
      console.error("Error signing out:", error);
    });
  };

  // Function to group messages by date
  const groupMessagesByDate = (messages) => {
    const grouped = {};
    
    messages.forEach(msg => {
      if (!msg.createdAt) return; // Skip messages with no timestamp
      
      // Get date string as YYYY-MM-DD for grouping
      const date = msg.createdAt.toDate?.() || new Date(msg.createdAt);
      const dateString = date.toISOString().split('T')[0];
      
      if (!grouped[dateString]) {
        grouped[dateString] = [];
      }
      
      grouped[dateString].push(msg);
    });
    
    return grouped;
  };

  // Determine if a message is from the same sender as previous message
  const isSameSenderAsPrevious = (currentMsg, index, messages) => {
    if (index === 0) return false;
    return messages[index - 1].uid === currentMsg.uid;
  };

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="chatroom-container">
        <div className="loading-container">
          <p>Loading chat room...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    return (
      <div className="chatroom-container">
        <div className="loading-container">
          <p>Please log in to access the chat room</p>
          <button 
            onClick={() => navigate("/login")} 
            className="login-redirect-button"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="chatroom-container">
      <div className="chatroom-header">
        <div className="chatroom-title">
          <h1>
            <Icon type={ICON_TYPES.CHAT} size="medium" className="header-icon" />
            SirTheProgrammer Chat Space
          </h1>
          <p className="online-status">
            <span className="status-dot"></span>
            {messages.length} messages
          </p>
        </div>
        <div className="user-profile">
          <div className="header-with-avatar">
            <img 
              src={process.env.PUBLIC_URL + `/avatars/${currentUserAvatar}.png`} 
              alt="Your Avatar" 
              className="header-avatar"
              onError={(e) => {
                console.warn(`Error loading avatar image: ${currentUserAvatar}`);
                e.target.src = process.env.PUBLIC_URL + '/avatars/default_avatar.png';
              }}
            />
            <div className="avatar-text">
              {user.displayName || user.email || "User"}
            </div>
          </div>
          <div className="user-actions">
            <Link to="/admin" className="admin-link">
              <Icon type={ICON_TYPES.ADMIN} size="small" />
              Admin
            </Link>
            <button onClick={handleSignOut} className="sign-out-button">
              <Icon type={ICON_TYPES.LOGOUT} size="small" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="chat-container">
        <div className="messages-container" id="messages-container" ref={messagesEndRef}>
          {loading ? (
            <div className="loading-messages">Loading messages...</div>
          ) : messages.length === 0 ? (
            <div className="no-messages">No messages yet. Start the conversation!</div>
          ) : (
            Object.entries(groupMessagesByDate(messages)).map(([dateStr, dateMessages]) => (
              <div key={dateStr} className="message-group">
                <DateSeparator date={dateStr} />
                {dateMessages.map((msg, index) => (
                  <MessageBubble
                    key={msg.id}
                    message={msg}
                    isOwnMessage={msg.uid === user?.uid}
                    isReplied={replyingTo && replyingTo.id === msg.id}
                    onReply={handleReply}
                    className={isSameSenderAsPrevious(msg, index, dateMessages) ? 'same-sender' : ''}
                  />
                ))}
              </div>
            ))
          )}
          
          {typingUsers.length > 0 && (
            <div className="typing-indicators">
              {Object.values(typingUsers).map((user) => (
                <TypingIndicator key={user.uid} user={user.displayName} />
              ))}
            </div>
          )}
        </div>
        
        <div className="message-form">
          {/* Show reply context if replying to a message */}
          {replyingTo && (
            <div className="reply-preview">
              <div className="reply-preview-content">
                <span className="reply-preview-label">Replying to {replyingTo.displayName || 'Anonymous'}</span>
                <span className="reply-preview-text">{replyingTo.text}</span>
              </div>
              <button className="cancel-reply-button" onClick={cancelReply}>
                <Icon type={ICON_TYPES.CLOSE} size="small" />
              </button>
            </div>
          )}
          
          <form onSubmit={sendMessage} className="message-input-form">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                handleTyping();
              }}
              placeholder="Type your message here..."
              className="message-input"
              autoComplete="off"
              aria-label="Message input"
            />
            <button type="submit" className="send-button" aria-label="Send message">
              <Icon type={ICON_TYPES.SEND} size="small" className="send-icon" />
              <span className="send-text">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom; 
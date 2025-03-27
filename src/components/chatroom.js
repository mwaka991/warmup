import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebase";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import "./chatroom.css";

// Helper function to get avatar image
const getAvatar = (userId, gender = "male") => {
  // Define a small set of avatars from W3Schools examples
  const avatars = {
    male: [
      "https://www.w3schools.com/w3images/avatar2.png",
      "https://www.w3schools.com/w3images/avatar3.png",
      "https://www.w3schools.com/w3images/avatar6.png"
    ],
    female: [
      "https://www.w3schools.com/w3images/avatar4.png",
      "https://www.w3schools.com/w3images/avatar5.png",
      "https://www.w3schools.com/w3images/avatar1.png"
    ],
    default: "https://www.w3schools.com/howto/img_avatar.png"
  };

  // Use user ID to consistently pick the same avatar for a user
  if (userId) {
    const sum = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const avatarList = gender === "female" ? avatars.female : avatars.male;
    const index = sum % avatarList.length;
    return avatarList[index];
  }

  return avatars.default;
};

// Update the Message component to include the avatar
const Message = ({ message, isOwnMessage }) => {
  const formattedTime = message.timestamp ? new Date(message.timestamp.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  
  return (
    <div className={`message-container ${isOwnMessage ? 'own-message' : 'other-message'}`}>
      <div className="message-avatar-container">
        <img 
          className="profile-avatar" 
          src={getAvatar(message.uid, isOwnMessage ? "male" : "female")}
          alt={message.displayName || "User"}
        />
      </div>
      <div className={`message ${isOwnMessage ? 'own' : 'other'}`}>
        {!isOwnMessage && <div className="message-sender">{message.displayName}</div>}
        <div className="message-content">
          <div className="message-text">{message.text}</div>
          <div className="message-time">{formattedTime}</div>
        </div>
      </div>
    </div>
  );
};

// Update the ChatRoom component
const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [currentUser] = useAuthState(auth);
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch messages from Firestore
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!messageText.trim() || !currentUser) return;

    try {
      await addDoc(collection(db, "messages"), {
        text: messageText,
        timestamp: serverTimestamp(),
        uid: currentUser.uid,
        displayName: currentUser.displayName || currentUser.email,
        email: currentUser.email
      });
      
      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
      {/* Add a header with current user avatar */}
      <div className="header-with-avatar">
        <img 
          className="profile-avatar" 
          src={currentUser ? getAvatar(currentUser.uid, "male") : getAvatar(null)}
          alt={currentUser ? (currentUser.displayName || currentUser.email) : "User"}
        />
        <div className="avatar-text">
          {currentUser ? (currentUser.displayName || currentUser.email) : 'Loading...'}
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="messages-container" ref={messagesEndRef}>
        {messages.map((msg) => (
          <Message 
            key={msg.id} 
            message={msg} 
            isOwnMessage={currentUser && msg.uid === currentUser.uid} 
          />
        ))}
        {/* Invisible div for scrolling to bottom */}
        <div ref={messagesEndRef}></div>
      </div>
      
      {/* Chat input form */}
      <form onSubmit={sendMessage} className="chat-form">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom; 
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { InitializeMessagesButton } from "../utils/initializeMessages";
import ThemeManager from "../components/ThemeManager";
import "./admin.css";

function AdminPanel() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState("");
  const [messageCount, setMessageCount] = useState(0);
  const [adminStatus, setAdminStatus] = useState("");
  const navigate = useNavigate();

  // Check authentication and admin status
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // In a real app, you'd check if the user has admin privileges
        // For now, we'll just check if they're authenticated
        setUser(currentUser);
        countMessages();
      } else {
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  // Count messages in Firestore
  const countMessages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "messages"));
      setMessageCount(querySnapshot.size);
    } catch (error) {
      console.error("Error counting messages:", error);
    }
  };

  // Add a new message manually
  const addMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || !user) return;

    try {
      const newMessage = {
        text: messageText,
        timestamp: serverTimestamp(),
        uid: user.uid,
        displayName: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL || "/default-avatar.png",
        email: user.email
      };

      await addDoc(collection(db, "messages"), newMessage);
      setMessageText("");
      setAdminStatus("Message added successfully!");
      countMessages();

      // Clear status after 3 seconds
      setTimeout(() => setAdminStatus(""), 3000);
    } catch (error) {
      setAdminStatus(`Error: ${error.message}`);
    }
  };

  // Clear all messages (dangerous - would need confirmation and admin rights)
  const clearAllMessages = async () => {
    const confirmed = window.confirm(
      "WARNING: This will delete ALL messages in the chat. This action cannot be undone. Continue?"
    );

    if (!confirmed) return;

    const doubleConfirmed = window.confirm(
      "Are you absolutely sure? All messages will be permanently deleted."
    );

    if (!doubleConfirmed) return;

    try {
      setAdminStatus("Deleting messages...");
      const querySnapshot = await getDocs(collection(db, "messages"));
      
      const deletePromises = querySnapshot.docs.map(doc => 
        deleteDoc(doc.ref)
      );
      
      await Promise.all(deletePromises);
      
      setAdminStatus("All messages deleted successfully.");
      countMessages();
    } catch (error) {
      setAdminStatus(`Error: ${error.message}`);
    }
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <p>Manage SirTheProgrammer Chat Space</p>
      </header>

      {/* Theme Manager Section */}
      <ThemeManager />

      <div className="admin-content">
        <div className="admin-card">
          <h2>Chat Statistics</h2>
          <p>Total Messages: <strong>{messageCount}</strong></p>
          <div className="admin-actions">
            <button onClick={countMessages} className="admin-button secondary">
              Refresh Count
            </button>
          </div>
        </div>

        <div className="admin-card">
          <h2>Initialize Sample Messages</h2>
          <p>Add sample welcome messages to start the conversation.</p>
          <div className="admin-actions">
            <InitializeMessagesButton />
          </div>
        </div>

        <div className="admin-card">
          <h2>Add Custom Message</h2>
          <form onSubmit={addMessage}>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Enter message text here..."
              rows={4}
              required
            />
            <button type="submit" className="admin-button">
              Add Message
            </button>
          </form>
        </div>

        <div className="admin-card danger-zone">
          <h2>Danger Zone</h2>
          <p>These actions cannot be undone. Proceed with caution.</p>
          <div className="admin-actions">
            <button onClick={clearAllMessages} className="admin-button danger">
              Delete All Messages
            </button>
          </div>
        </div>
      </div>

      {adminStatus && (
        <div className={`admin-status ${adminStatus.includes("Error") ? "error" : "success"}`}>
          {adminStatus}
        </div>
      )}

      <div className="admin-navigation">
        <button onClick={() => navigate("/chat")} className="admin-button secondary">
          Back to Chat
        </button>
        <button onClick={() => navigate("/")} className="admin-button secondary">
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default AdminPanel; 
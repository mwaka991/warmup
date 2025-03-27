import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";

function Dashboard() {
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (content) {
      await addDoc(collection(db, "messages"), { text: content });
      setContent("");
      fetchMessages();
    }
  };

  const fetchMessages = async () => {
    const querySnapshot = await getDocs(collection(db, "messages"));
    setMessages(querySnapshot.docs.map(doc => doc.data().text));
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={() => { signOut(auth); window.location.href = "/"; }}>Logout</button>
      <div>
        <input type="text" placeholder="Type something..." value={content} onChange={(e) => setContent(e.target.value)} />
        <button onClick={handleSend}>Send</button>
      </div>
      <div>
        <h3>Messages:</h3>
        {messages.map((msg, index) => <p key={index}>{msg}</p>)}
      </div>
    </div>
  );
}

export default Dashboard;

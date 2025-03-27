import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// This function adds sample messages to the Firestore database
export const initializeSampleMessages = async () => {
  try {
    // Sample messages to initialize the chat
    const sampleMessages = [
      {
        text: "Welcome to SirTheProgrammer Chat Space! 👋",
        timestamp: serverTimestamp(),
        uid: "admin",
        displayName: "Admin",
        photoURL: "/default-avatar.png",
        email: "admin@sirtheprogrammer.com"
      },
      {
        text: "Feel free to share your thoughts and ideas here!",
        timestamp: serverTimestamp(),
        uid: "admin",
        displayName: "Admin",
        photoURL: "/default-avatar.png",
        email: "admin@sirtheprogrammer.com"
      },
      {
        text: "This is a safe space for everyone to communicate.",
        timestamp: serverTimestamp(),
        uid: "moderator",
        displayName: "Moderator",
        photoURL: "/default-avatar.png",
        email: "mod@sirtheprogrammer.com"
      }
    ];

    // Add each sample message to Firestore
    const messagesCollection = collection(db, "messages");
    
    for (const message of sampleMessages) {
      await addDoc(messagesCollection, message);
      console.log("Added sample message:", message.text);
    }

    console.log("Successfully initialized sample messages!");
    return true;
  } catch (error) {
    console.error("Error initializing messages:", error);
    return false;
  }
};

// Run this function to initialize messages - you can call this from a button or a developer tool
export const initializeMessages = async () => {
  const confirmed = window.confirm(
    "This will add sample messages to the chat. Continue?"
  );
  
  if (confirmed) {
    const result = await initializeSampleMessages();
    if (result) {
      window.alert("Sample messages added successfully!");
    } else {
      window.alert("Failed to add sample messages. Check console for details.");
    }
  }
};

// Export a component that can be used as a button in development
export const InitializeMessagesButton = () => {
  return (
    <button 
      onClick={initializeMessages}
      style={{
        padding: '8px 16px',
        background: '#4a90e2',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      Initialize Sample Messages
    </button>
  );
};

export default initializeMessages; 
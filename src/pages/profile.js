import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { updateProfile } from 'firebase/auth';
import './profile.css';

// Define avatarSamples directly here since we might not have the utils file yet
const avatarSamples = {
  // Default avatar - this will be assigned to new users
  default_avatar: {
    id: 'default_avatar',
    name: 'Default Avatar',
    imagePath: '/avatars/default_avatar.png',
    color: '#3498db'
  },
  
  // Numbered avatars from 1 to 7
  avatar_1: {
    id: 'avatar_1',
    name: 'Avatar 1',
    imagePath: '/avatars/avatar_1.png',
    color: '#e67e22'
  },
  avatar_2: {
    id: 'avatar_2',
    name: 'Avatar 2',
    imagePath: '/avatars/avatar_2.png',
    color: '#8e44ad'
  },
  avatar_3: {
    id: 'avatar_3',
    name: 'Avatar 3',
    imagePath: '/avatars/avatar_3.png',
    color: '#2ecc71'
  },
  avatar_4: {
    id: 'avatar_4',
    name: 'Avatar 4',
    imagePath: '/avatars/avatar_4.png',
    color: '#f1c40f'
  },
  avatar_5: {
    id: 'avatar_5',
    name: 'Avatar 5',
    imagePath: '/avatars/avatar_5.png',
    color: '#34495e'
  },
  avatar_6: {
    id: 'avatar_6',
    name: 'Avatar 6',
    imagePath: '/avatars/avatar_6.png',
    color: '#3498db'
  },
  avatar_7: {
    id: 'avatar_7',
    name: 'Avatar 7',
    imagePath: '/avatars/avatar_7.png',
    color: '#e74c3c'
  }
};

const Profile = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [displayName, setDisplayName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('default_avatar');
  const [userProfile, setUserProfile] = useState(null);
  const [status, setStatus] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(true);

  // Load user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'userProfiles', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserProfile(data);
          setDisplayName(user.displayName || '');
          setSelectedAvatar(data.avatarId || 'default_avatar');
        } else {
          // Initialize with defaults
          setDisplayName(user.displayName || '');
          setSelectedAvatar('default_avatar');
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setStatus({
          message: 'Error loading profile. Please try again.',
          type: 'error'
        });
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  // Handle avatar selection
  const handleAvatarSelect = (avatarId) => {
    setSelectedAvatar(avatarId);
  };

  // Save profile changes
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Make sure we're storing the avatarId properly
      await setDoc(doc(db, 'userProfiles', user.uid), {
        displayName: displayName,
        avatarId: selectedAvatar,  // This is the key field for avatars
        updatedAt: new Date()
      }, { merge: true });

      // Update Firebase Auth profile
      if (user.displayName !== displayName) {
        await updateProfile(auth.currentUser, {
          displayName: displayName
        });
      }

      setStatus({
        message: 'Profile updated successfully! Your avatar will appear in chat.',
        type: 'success'
      });
      
      // Force a reload of the current user's data
      setUser({...auth.currentUser});
      
    } catch (error) {
      console.error("Error updating profile:", error);
      setStatus({
        message: 'Error updating profile. Please try again.',
        type: 'error'
      });
    }

    setLoading(false);
  };

  if (!user) {
    return (
      <div className="profile-container">
        <h2>Please sign in to view your profile</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-spinner">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      
      {status.message && (
        <div className={`status-message ${status.type}`}>
          {status.message}
        </div>
      )}
      
      <form onSubmit={handleSaveProfile} className="profile-form">
        <div className="form-group">
          <label htmlFor="displayName">Display Name</label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter your display name"
          />
        </div>
        
        <div className="form-group">
          <label>Select Avatar</label>
          <div className="avatar-selection">
            {Object.values(avatarSamples).map((avatar) => (
              <div 
                key={avatar.id}
                className={`avatar-option ${selectedAvatar === avatar.id ? 'selected' : ''}`}
                onClick={() => handleAvatarSelect(avatar.id)}
                style={{ backgroundColor: avatar.color }}
              >
                <div className="avatar-preview">
                  <img 
                    src={process.env.PUBLIC_URL + avatar.imagePath} 
                    alt={avatar.name} 
                    className="avatar-preview-image"
                    onError={(e) => {
                      console.warn(`Error loading avatar image: ${avatar.imagePath}`);
                      e.target.src = process.env.PUBLIC_URL + avatarSamples.default_avatar.imagePath;
                    }}
                  />
                </div>
                <div className="avatar-name">{avatar.name}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="current-avatar-preview">
          <h3>Your Current Avatar</h3>
          <div 
            className="selected-avatar" 
            style={{ backgroundColor: avatarSamples[selectedAvatar].color }}
          >
            <img 
              src={process.env.PUBLIC_URL + avatarSamples[selectedAvatar].imagePath} 
              alt={avatarSamples[selectedAvatar].name}
              className="selected-avatar-image"
              onError={(e) => {
                console.warn(`Error loading avatar image: ${avatarSamples[selectedAvatar].imagePath}`);
                e.target.src = process.env.PUBLIC_URL + avatarSamples.default_avatar.imagePath;
              }}
            />
          </div>
          <p>{avatarSamples[selectedAvatar].name}</p>
        </div>
        
        <button 
          type="submit" 
          className="save-button"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
};

export default Profile; 
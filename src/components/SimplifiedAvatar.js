import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import avatarSamples from '../utils/avatarSamples';
import './Avatar.css';

const SimplifiedAvatar = ({ uid, className, size = 'medium' }) => {
  const [avatarInfo, setAvatarInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAvatar = async () => {
      if (!uid) {
        setAvatarInfo(avatarSamples.default_avatar);
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'userProfiles', uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const avatarId = userData.avatarId || 'default_avatar';
          
          // Get avatar info from our samples
          const avatar = avatarSamples[avatarId] || avatarSamples.default_avatar;
          setAvatarInfo(avatar);
          
          console.log(`Fetched avatar for user ${uid}: ${avatar.name} (${avatarId})`);
        } else {
          // Use default avatar if no profile exists
          console.log(`No profile found for user ${uid}, using default avatar`);
          setAvatarInfo(avatarSamples.default_avatar);
        }
      } catch (err) {
        console.error('Error fetching user avatar:', err);
        setError(err.message);
        // Fall back to default avatar on error
        setAvatarInfo(avatarSamples.default_avatar);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAvatar();
  }, [uid]);

  if (loading) {
    return <div className={`avatar avatar-${size} avatar-loading ${className || ''}`} style={{borderRadius: '50%'}}></div>;
  }

  if (error) {
    console.warn('Avatar error, using default:', error);
    // Return default avatar on error
    return (
      <div 
        className={`avatar avatar-${size} ${className || ''}`}
        style={{ 
          backgroundColor: avatarSamples.default_avatar.color,
          borderRadius: '50%'
        }}
      >
        <img 
          src={process.env.PUBLIC_URL + avatarSamples.default_avatar.imagePath}
          alt="Default Avatar"
          className="avatar-image"
          style={{
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            borderRadius: '50%'
          }}
          onError={(e) => {
            // If image fails to load, show first letter of "User"
            e.target.style.display = 'none';
            e.target.parentNode.textContent = 'U';
          }}
        />
      </div>
    );
  }

  // Ensure we always have a valid imagePath by checking if it exists
  const imagePath = avatarInfo && avatarInfo.imagePath 
    ? avatarInfo.imagePath 
    : avatarSamples.default_avatar.imagePath;

  return (
    <div 
      className={`avatar avatar-${size} ${className || ''}`}
      style={{ 
        backgroundColor: avatarInfo.color,
        borderRadius: '50%',
        overflow: 'hidden'
      }}
    >
      <img 
        src={process.env.PUBLIC_URL + imagePath}
        alt={avatarInfo.name || "Avatar"}
        className="avatar-image"
        style={{
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          borderRadius: '50%'
        }}
        onError={(e) => {
          // If image fails to load, use default avatar
          console.warn(`Failed to load avatar image: ${imagePath}`);
          e.target.src = process.env.PUBLIC_URL + avatarSamples.default_avatar.imagePath;
        }}
      />
    </div>
  );
};

export default SimplifiedAvatar; 
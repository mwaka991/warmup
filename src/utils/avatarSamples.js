/**
 * Avatar samples for user profile selection
 * 
 * This file defines the available avatars that users can select
 * from when customizing their profile.
 */

// Define avatar samples for use throughout the app
export const avatarSamples = {
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

// Export as default and named export for flexibility
export default avatarSamples; 
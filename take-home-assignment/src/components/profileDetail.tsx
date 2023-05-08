import React from 'react';
import profile from '../img/profile.webp';
import '../style/profile.css';
interface UserProfileProps {
  name?: string;
  email?: string;
  bio?: string;
  profilePictureUrl?: string;
}

const ProfileDetail = ({ name= "Samuel", email="example@gmail.com", bio="Male", profilePictureUrl=profile } : UserProfileProps) => {
  
  
    return <>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <img
          src={profilePictureUrl}
          alt="Profile"
        />
        <div style={{ flex: 1}}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '4px' }}>{name}</h2>
          <p style={{ fontSize: '14px', fontWeight: 500, color: '#777' }}>{email}</p>
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Bio:</h3>
        <p style={{ fontSize: '14px', fontWeight: 400, lineHeight: '22px' }}>{bio}</p>
      </div>
        </>
};

export default ProfileDetail;

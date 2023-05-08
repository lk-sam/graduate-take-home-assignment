import React, { useEffect, useState } from "react";
import ProfileDetail from "../components/profileDetail";
import profile from '../img/profile.webp';

interface UserProfileProps {
    id: Number;
}
const UserProfile = ({ id }: UserProfileProps) => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        bio: '',
        profilePictureUrl: profile,
      });
      
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/profile?user_id=${id}`);
            const data = await response.json();
            console.log(data);
            setUserData({
                name: data.username,
                email: data.email,
                ...data,
            });
        }
        fetchData();
    }, [id]);

    
    return <>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 600, marginBottom: '20px' }}>User Profile</h1>
      

        <ProfileDetail {...userData} />
        </div>
    </>
};

export default UserProfile;
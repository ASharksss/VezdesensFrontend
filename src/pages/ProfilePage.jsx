import React from 'react';
import '../components/profile/profile.css'
import ProfileCard from "../components/profile/profileCard";
import avatar from "../asserts/profile/profile_avatar.png"

const ProfilePage = () => {
  return (
    <div className='container'>
      <div className="wrapper">
        <ProfileCard avatar={avatar}/>
      </div>
    </div>
  );
};

export default ProfilePage;
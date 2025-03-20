import React, { useState } from "react";
import "./Account.css"; 
import profPhoto from './profile-pic.png';

const Account = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    bio: "Passionate about technology and coding.",
    profilePic: profPhoto,
  });

  return (
   <div className="account-container">
     <div className="header-container">
       <img src={user.profilePic} alt="Profile" className="profile-pic"/>
       <p>{user.name}</p>
     </div>

     <div className="account-body">
       <div className="personal-info">
         <h6>Personal Information</h6>
         <p><b>Name:</b> {user.name}</p>
         <p><b>Email:</b> {user.email}</p>
         <p><b>Phone:</b> {user.phone}</p>
         <p><b>Bio:</b> {user.bio}</p>
       </div>

       <div className="additional-info">
         <h6>User Preferences</h6>
         <p><b>Language:</b> English</p>
         <p><b>Theme:</b> Dark Mode</p>
         <p><b>Notifications:</b> Enabled</p>
         <p><b>Subscribed to Newsletter:</b> Yes</p>
       </div>
     </div>
   </div>
  );
};

export default Account;

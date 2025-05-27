import React from "react";
import "./Account.css";
import profPhoto from './profile-pic.png';
import { useUser } from "../../context/UserContext.jsx";

const Account = () => {
  const { user, loading } = useUser();
  console.log("Account page user:", user);      // ✅ Add this
  console.log("Account page loading:", loading);
  if (loading) {
    return <div className="account-container">Loading user info...</div>;
  }

  if (!user) {
    return <div className="account-container">No user logged in.</div>;
  }

  return (
    <div className="account-container">
      <div className="header-container">
        <img
          src={user.userImage || profPhoto}
          alt="Profile"
          className="profile-pic"
        />
        <p>{user.Name || user.username}</p>
      </div>

      <div className="account-body">
        <div className="personal-info">
          <h6>Personal Information</h6>
          <p><b>Name:</b> {user.Name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone:</b> {user.phoneNo}</p>
          <p><b>DOB:</b> {user.DOB?.substring(0, 10)}</p>
          <p><b>Gender:</b> {user.Gender}</p>
          <p><b>Address:</b> {user.Address}</p>
          <p><b>Department:</b> {user.Department}</p>
          <p><b>Medical History:</b> {user.MedicalHistory}</p>
        </div>

        <div className="additional-info">
          <h6>User Preferences</h6>
          <p><b>Role:</b> {user.role}</p>
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

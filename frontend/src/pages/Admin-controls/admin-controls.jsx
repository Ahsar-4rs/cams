import React from 'react';
import { useNavigate } from 'react-router-dom';
import addUserImage from './Add.jpg';
import addLocationImage from './location.jpg';
import './admin-controls.css';

const AdminControls = () => {
    const navigate = useNavigate();

    const handleAddUserClick = () => {
        // Navigate to the Add User page or functionality
        navigate('add-user');
    };

    const handleAddLocationClick = () => {
      // Navigate to the Add Location page or functionality
      navigate('add-location');
    }

    return (
        <div className="admin-controls-container">
          <div className="admin-controls-content-wrapper">
            <h1 className="admin-controls-title">Admin Hub</h1>
            <div className="admin-controls-group">

            <div className="admin-control">
              <img 
                src={addUserImage} 
                alt="Add User" 
                className="admin-control-image" 
                onClick={handleAddUserClick}
                style={{ cursor: "pointer" }}
              />
              <p>Add User</p>
            </div>
            <div className="admin-control">
              <img
                src={addLocationImage}
                alt="Add Location"
                className="admin-control-image"
                onClick={handleAddLocationClick}
                style={{ cursor: "pointer" }}
              />
              <p>Add Location</p>
            </div>
            </div>
          </div>
        </div>
      );
};

export default AdminControls;
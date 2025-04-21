import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddImage from './Add.jpg'; 
import EditImage from './Edit.jpg'; 
import DeleteImage from './Delete.jpg';
import './EventManagement.css'; 

const EventManagement = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <h2>Event Management</h2>
            <div className="event-management-container">
                <div className="event-action" onClick={() => navigate('/AddEvent')}>
                    <div className="image-upload-container">
                        <img src={AddImage} alt="Add Event" className="event-image" />
                        <p>Add Event</p>
                    </div>
                </div>
                <div className="event-action" onClick={() => navigate('/EditEvent')}>
                    <div className="image-upload-container">
                        <img src={EditImage} alt="Edit Event" className="event-image" />
                        <p>Edit Event</p>
                    </div>
                </div>
                <div className="event-action" onClick={() => navigate('/DeleteEvent')}>
                    <div className="image-upload-container">
                        <img src={DeleteImage} alt="Delete Event" className="event-image" />
                        <p>Delete Event</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventManagement;
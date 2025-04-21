import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './EditEvent.css';

export default function EditEvent() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        eventName: '',
        eventInfo: '',
        eventDate: '',
        eventTime: '',
        eventVenue: '',
        organizer: '',
        eventImage: ''
    });

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:4000/api/v1/socialEvent/getEvent/${eventId}`);
                
                // Format date for input if it exists
                const event = response.data;
                if (event.eventDate) {
                    try {
                        const dateObj = new Date(event.eventDate);
                        if (!isNaN(dateObj)) {
                            const year = dateObj.getFullYear();
                            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                            const day = String(dateObj.getDate()).padStart(2, '0');
                            event.eventDate = `${year}-${month}-${day}`;
                        }
                    } catch (error) {
                        console.error("Error formatting date:", error);
                    }
                }
                
                setFormData(event);
                setImagePreview(event.eventImage);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching event:", error);
                setError("Failed to load event details. Please try again.");
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        
        try {
            // Create a FormData object to handle file uploads
            const formDataToSend = new FormData();
            
            // Add all text fields to FormData
            Object.keys(formData).forEach(key => {
                if (key !== 'eventImage' || !imageFile) { // Don't add eventImage if we have a new file
                    formDataToSend.append(key, formData[key]);
                }
            });
            
            // Add image file if it exists
            if (imageFile) {
                formDataToSend.append('eventImage', imageFile);
            }
            
            await axios.put(
                `http://localhost:4000/api/v1/socialEvent/updateEvent/${eventId}`,
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            
            alert("Event updated successfully!");
            navigate("/event-management/edit-action");
        } catch (error) {
            console.error("Error updating event:", error.response?.data || error.message || error);
            setError(`Failed to update event: ${error.response?.data?.message || error.message || "Unknown error"}`);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="edit-event-container">
                <div className="loading">Loading event details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="edit-event-container">
                <div className="error-message">{error}</div>
                <button className="back-button" onClick={() => navigate("/event-management/edit-action")}>
                    Back to Events
                </button>
            </div>
        );
    }

    return (
        <div className="edit-event-container">
            <div className="edit-event-card">
                <h2>Edit Event</h2>
                <div className="event-current-image">
                    <h3>Event Image:</h3>
                    <img src={imagePreview || formData.eventImage} alt={formData.eventName} />
                    <div className="image-upload-container">
                        <label htmlFor="eventImageFile" className="image-upload-label">
                            Choose New Image
                        </label>
                        <input
                            type="file"
                            id="eventImageFile"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="image-upload-input"
                        />
                        {imageFile && (
                            <div className="new-image-name">
                                Selected: {imageFile.name}
                            </div>
                        )}
                    </div>
                </div>
                
                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="form-group">
                        <label htmlFor="eventName">Event Name:</label>
                        <input
                            type="text"
                            id="eventName"
                            name="eventName"
                            value={formData.eventName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="eventInfo">Event Description:</label>
                        <textarea
                            id="eventInfo"
                            name="eventInfo"
                            value={formData.eventInfo}
                            onChange={handleChange}
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="eventDate">Date:</label>
                            <input
                                type="date"
                                id="eventDate"
                                name="eventDate"
                                value={formData.eventDate}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="eventTime">Time:</label>
                            <input
                                type="time"
                                id="eventTime"
                                name="eventTime"
                                value={formData.eventTime}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="eventVenue">Venue:</label>
                        <input
                            type="text"
                            id="eventVenue"
                            name="eventVenue"
                            value={formData.eventVenue}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="organizer">Organizer:</label>
                        <input
                            type="text"
                            id="organizer"
                            name="organizer"
                            value={formData.organizer}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="form-actions">
                        <button 
                            type="submit" 
                            className="save-button"
                            disabled={submitting}
                        >
                            {submitting ? "Saving..." : "Save Changes"}
                        </button>
                        <button 
                            type="button" 
                            className="cancel-button"
                            onClick={() => navigate("/event-management/edit-action")}
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
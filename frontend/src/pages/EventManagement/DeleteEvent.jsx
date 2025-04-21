import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './DeleteEvent.css';

export default function DeleteEvent() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/socialEvent/getEvent/${eventId}`);
                setEvent(response.data);
            } catch (error) {
                console.error("Error fetching event:", error);
                setError("Failed to load event details. Please try again.");
            }
        };

        fetchEvent();
    }, [eventId]);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
            return;
        }

        setIsDeleting(true);
        try {
            await axios.delete(`http://localhost:4000/api/v1/socialEvent/deleteEvent/${eventId}`);
            alert("Event deleted successfully");
            navigate("/event-management/delete-action");
        } catch (error) {
            console.error("Error deleting event:", error);
            setError("Failed to delete event. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    if (error) {
        return (
            <div className="delete-event-container">
                <div className="error-message">{error}</div>
                <button className="back-button" onClick={() => navigate("/event-management/delete-action")}>
                    Back to Events
                </button>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="delete-event-container">
                <div className="loading">Loading event details...</div>
            </div>
        );
    }

    return (
        <div className="delete-event-container">
            <div className="delete-event-card">
                <h2>Delete Event</h2>
                <div className="event-details">
                    <div className="event-image">
                        <img src={event.eventImage} alt={event.eventName} />
                    </div>
                    <div className="event-info">
                        <h3>{event.eventName}</h3>
                        <p><strong>Date:</strong> {event.eventDate}</p>
                        <p><strong>Time:</strong> {event.eventTime}</p>
                        <p><strong>Venue:</strong> {event.eventVenue}</p>
                        <p><strong>Organizer:</strong> {event.Organizer}</p>
                        <p className="description">{event.eventInfo}</p>
                    </div>
                </div>
                <div className="confirmation-message">
                    <p>Are you sure you want to delete this event?</p>
                    <p className="warning">This action cannot be undone!</p>
                </div>
                <div className="action-buttons">
                    <button 
                        className="delete-button" 
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete Event"}
                    </button>
                    <button 
                        className="cancel-button" 
                        onClick={() => navigate("/event-management/delete-action")}
                        disabled={isDeleting}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
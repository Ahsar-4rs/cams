import React, { useEffect, useState } from "react";
import axios from "axios"
import '../Events-Page/EventsPage.css'
import { useLocation, useNavigate } from "react-router-dom";
import './DeleteEventAction.css';

function DeleteEventAction() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const selectedEventName = query.get('event');

    const [events, setEvents] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    const fetchEvents = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/v1/socialEvent/getEvents");
            setEvents(response.data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        if (selectedEventName) {
            const element = document.getElementById(selectedEventName);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                element.classList.add('glow');
                setTimeout(() => {
                    element.classList.remove('glow');
                }, 2000);
            }
        }
    }, [selectedEventName]);

    const handleDeleteEvent = async (event, eventId) => {
        event.stopPropagation(); // Prevent navigation

        if (!confirm(`Are you sure you want to delete "${event.eventName}"? This action cannot be undone.`)) {
            return;
        }

        setIsDeleting(true);
        try {
            await axios.delete(`http://localhost:4000/api/v1/socialEvent/deleteEvent/${eventId}`);
            alert("Event deleted successfully");
            // Refresh events list
            fetchEvents();
        } catch (error) {
            console.error("Error deleting event:", error);
            alert("Failed to delete event. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="events-container">
            <h1 className="events-title">Delete Events</h1>
            <p className="events-description">
                Select an event to delete. You can either click the "Delete Event" button 
                to view details before deleting, or use the "Quick Delete" button to delete directly.
            </p>
            <div className="events-menu">
                {events.length === 0 && (
                    <div className="no-events">
                        <p>No events available</p>
                    </div>
                )}
                
                {events.map((event) => (
                    <div className="event-card" key={event.eventName} id={event.eventName}>
                        <div className="event-image">
                            <img src={event.eventImage} alt={event.eventName + " Image"} />
                        </div>
                        <div className="event-main-content">
                            <h2 className="event-name">{event.eventName}</h2>
                            <p className="event-description">{event.eventInfo}</p>
                            <div className="event-info">
                                {event.eventDate && (
                                    <div className="info-item">
                                        <span className="label">Date:</span> {event.eventDate}
                                    </div>
                                )}
                                {event.eventTime && (
                                    <div className="info-item">
                                        <span className="label">Time:</span> {event.eventTime}
                                    </div>
                                )}
                                {event.eventVenue && (
                                    <div className="info-item">
                                        <span className="label">Venue:</span> {event.eventVenue}
                                    </div>
                                )}
                                {event.Organizer && (
                                    <div className="info-item">
                                        <span className="label">Organizer:</span> {event.Organizer}
                                    </div>
                                )}
                            </div>
                            <div className="event-actions">
                                <button 
                                    className="view-location-button" 
                                    onClick={() => navigate(`/event-management/delete/${event._id}`)}
                                    disabled={isDeleting}
                                >
                                    Delete Event
                                </button>
                                <button 
                                    className="quick-delete-button" 
                                    onClick={(e) => handleDeleteEvent(e, event._id)}
                                    disabled={isDeleting}
                                >
                                    Quick Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DeleteEventAction;
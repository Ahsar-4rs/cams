import React, { useEffect, useState } from "react";
import axios from "axios";
import './EventsPage.css';
import { useLocation, useNavigate } from 'react-router-dom';

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
};

function EventPage() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const selectedEventName = query.get('event');
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/v1/socialEvent/getEvents");
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

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

    return (
        <div className="events-menu">
            {events.map((Event) => (
                <div className="event-card" key={Event.eventName} id={Event.eventName}>
                    <div className="event-image">
                        <img src={Event.eventImage} alt={Event.eventName + "Image"} />
                    </div>
                    <div className="event-main-content">
                        <h2 className="event-name">{Event.eventName}</h2>
                        <p className="event-description">{Event.eventInfo}</p>
                        <div className="event-info">
                            {Event.eventDate && (
                                <div className="info-item">
                                    <span className="label">Date:</span> {formatDate(Event.eventDate)} {/* Format the date */}
                                </div>
                            )}
                            {Event.eventTime && (
                                <div className="info-item">
                                    <span className="label">Time:</span> {Event.eventTime}
                                </div>
                            )}
                            {Event.eventVenue && (
                                <div className="info-item">
                                    <span className="label">Venue:</span> {Event.eventVenue}
                                </div>
                            )}
                            {Event.Organizer && (
                                <div className="info-item">
                                    <span className="label">Organizer:</span> {Event.Organizer}
                                </div>
                            )}
                        </div>
                        <button className="view-location-button" onClick={() => navigate('/locations')}> View Location</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default EventPage;

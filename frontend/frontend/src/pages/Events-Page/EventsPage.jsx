import React, { useEffect } from "react";
import { Events } from "../../Components/Events/Eventdetails";
import './EventsPage.css'
import { useLocation } from 'react-router-dom';

function EventPage() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const selectedEventName = query.get('event');

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
            {Events.map((Event) => (
                <div className="event-card" key={Event.Name} id={Event.Name}>
                    <div className="event-image">
                        <img src={Event.Image} alt={Event.Name + " Image"} />
                    </div>
                    <div className="event-main-content">
                        <h2 className="event-name">{Event.Name}</h2>
                        <p className="event-description">{Event.Body}</p>
                        <div className="event-info">
                            {Event.Date && (
                                <div className="info-item">
                                    <span className="label">Date:</span> {Event.Date}
                                </div>
                            )}
                            {Event.Time && (
                                <div className="info-item">
                                    <span className="label">Time:</span> {Event.Time}
                                </div>
                            )}
                            {Event.Venue && (
                                <div className="info-item">
                                    <span className="label">Venue:</span> {Event.Venue}
                                </div>
                            )}
                            {Event.Organizer && (
                                <div className="info-item">
                                    <span className="label">Organizer:</span> {Event.Organizer}
                                </div>
                            )}
                        </div>
                        <button className="view-location-button">View Location</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default EventPage
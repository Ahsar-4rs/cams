import React from "react";
import { Events } from "../../Components/Events/Eventdetails";
import './EventsPage.css'

function EventPage() {
    return (
        <div className="events-menu">
            {Events.map((Event) => (
                <div className="event-card" key={Event.Name}>
                    <div className="event-image">
                        <img src={Event.Image} alt={Event.Name + " Image"}/>
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
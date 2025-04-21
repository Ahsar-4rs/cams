import React from "react";
import './Event.css';

function EventComponent(props) {
    const { Name, Date: eventDate, Time, Venue, Image, Organizer } = props;

    
    const formattedDate = new Date(eventDate).toLocaleDateString("en-CA"); // "YYYY-MM-DD" format

    return (
        <div className="event-cards">
            <h5 className="organizer">{Organizer}</h5>
            <img className="event-image" src={Image} alt={Name} />
            <div className="event-info">
                <h5 id="Name">{Name}</h5>
                <h6 id="Date">{formattedDate}</h6>
                <h6 id="Time">{Time}</h6>
                <h6 id="Venue">{Venue}</h6>
            </div>
        </div>
    );
}

export default EventComponent;

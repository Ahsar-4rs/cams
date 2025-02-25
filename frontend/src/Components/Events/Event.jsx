import React from "react";
import './Event.css'

function EventComponent(props){

    const {Name, Date, Time, Venue, Image, Organizer} = props
    console.log("Event Props:", props);
    
    return(
        <div className="event-card">
            <h5 className="organizer">{Organizer}</h5>
            <img className="event-image" src={Image} alt={Name} />
            <div className="event-info">
                <h5 id="Name">{Name}</h5>
                <h6 id="Date">{Date}</h6>
                <h6 id="Time">{Time}</h6>
                <h6 id="Venue">{Venue}</h6>
            </div>
        </div>
    )
}

export default EventComponent
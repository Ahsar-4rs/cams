import React from "react";
import './Event.css'

function Event(props){

    const {Name, Date, Image, Time, Venue, Organizer} = props
    console.log(Image)
    
    return(
        <div className="event-card">
            <p><h5>{Organizer}</h5></p>
            <img className="event-image" src={Image} alt={Name} />
            <div>
                <h5>{Name}</h5>
                <h6>{Date}</h6>
                <h6>{Time}</h6>
                <h6>{Venue}</h6>
            </div>

        </div>
    )
}

export default Event
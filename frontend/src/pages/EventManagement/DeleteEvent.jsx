import React from "react";
import { useParams } from "react-router-dom";
import placeholderimage from '../../assets/working.jpg';
import './DeleteEvent.css';

export default function DeleteEvent() {
    const { eventId } = useParams();
    return(
        <div className="delete-event-container">
            <img src={placeholderimage} alt="Work In Progress" />
        </div>
    )
}
import React from "react";
import { useParams } from "react-router-dom";
import placeholderimage from '../../assets/working.jpg';
import './EditEvent.css';

export default function EditEvent() {
    const { eventId } = useParams();
    return(
        <div>
            <img src={placeholderimage} alt="Work In Progress" />
        </div>
    )
}
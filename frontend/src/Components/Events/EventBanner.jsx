import React from 'react';
import { Events } from './Eventdetails.jsx';
import EventComponent from './Event.jsx';
import './EventBanner.css';

function EventBanner() {
  return (
    <div className='event-banner'>
        <div id='upcomingEvents'>
          <div className="title-container">
            <h2><span id='firstHalf'>Upcoming</span><span id='secondHalf'> Events </span></h2>
          </div>
          <hr />
          <div className='event-grid'>
            {Events.map((Event) => (
              <EventComponent Name = {Event.Name} Date = {Event.Date} Time = {Event.Time} Venue = {Event.Venue} Image = {Event.Image} Organizer = {Event.Organizer} ></EventComponent>
            )
            )}
          </div>
        </div>
    </div>
  )
}

export default EventBanner
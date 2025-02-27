import React from 'react';
import { Events } from './Eventdetails.jsx';
import EventComponent from './Event.jsx';
import './EventBanner.css';
import { useNavigate } from 'react-router-dom';

function EventBanner() {
  const navigate = useNavigate();

  const handleEventClick = (eventName) => {
    navigate(`/EventPage?event=${encodeURIComponent(eventName)}`);
  };

  return (
    <div className='event-banner'>
        <div id='upcomingEvents'>
          <div className="title-container">
            <h2><span id='firstHalf'>Upcoming</span><span id='secondHalf'> Events </span></h2>
          </div>
          <hr />
          <div className='event-grid'>
            {Events.map((Event) => (
              <div onClick={() => handleEventClick(Event.Name)} key={Event.Name}>
                <EventComponent Name={Event.Name} Date={Event.Date} Time={Event.Time} Venue={Event.Venue} Image={Event.Image} Organizer={Event.Organizer} />
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default EventBanner
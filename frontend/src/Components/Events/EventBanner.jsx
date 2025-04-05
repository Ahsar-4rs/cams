import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventComponent from './Event.jsx';
import './EventBanner.css';
import { useNavigate } from 'react-router-dom';

function EventBanner() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/socialEvent/getEvents"); // Change if port or route differs
      setEvents(response.data); // Adjust depending on your backend response
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventClick = (eventName) => {
    navigate(`/EventPage?event=${encodeURIComponent(eventName)}`);
  };

  return (
    <div className='event-banner'>
      <div id='upcomingEvents'>
        <div className="title-container">
          <h2>
            <span id='firstHalf'>Upcoming</span>
            <span id='secondHalf'> Events </span>
          </h2>
        </div>
        <hr />
        {loading ? (
          <p>Loading events...</p>
        ) : (
          <div className='event-grid'>
            {events.map((event) => (
              <div onClick={() => handleEventClick(event.eventName)} key={event._id}>
                <EventComponent 
                  Name={event.eventName} 
                  Date={event.eventDate} 
                  Time={event.eventTime} 
                  Venue={event.eventVenue} 
                  Image={event.eventImage} 
                  Organizer={event.organizer} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EventBanner;


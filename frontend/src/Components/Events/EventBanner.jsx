import React from 'react'
import './EventBanner.css'
import Event from './Event'

function EventBanner() {
  return (
    <div className='event-banner'>
        <div id='upcomingEvents'>
            <h2 id='firstHalf'>Upcoming</h2><h2 id='secondHalf'> Events</h2>
            <Event Name = "Hestia"></Event>
        </div>
    </div>
  )
}

export default EventBanner
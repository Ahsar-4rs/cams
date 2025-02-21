import React from 'react'
import Event from './Event.jsx'
import Pictures from '../../assets/events/pictures.jsx'
import './EventBanner.css'

function EventBanner() {
  return (
    <div className='event-banner'>
        <div id='upcomingEvents'>
          <div className="title-container">
            <h2><span id='firstHalf'>Upcoming</span><span id='secondHalf'> Events </span></h2>
          </div>
          <hr />
          <div className='event-grid'>
            <Event Name = "പ്രതിധി" Date = '25-01-2025' Time = "2:00 pm" Venue = "TKM College of Engineering" Image = {Pictures.Prathidhi} Organizer = "STEPS"></Event>
            <Event Name = "DevOps" Date = '25-01-2025' Time = "9:00 am - 4:00 pm" Venue = "System Software Lab" Image = {Pictures.DevOps} Organizer = "FOSS Club"></Event>
            <Event Name = "Advanced Computer Vision" Date = '06-02-2025 | 08-02-2025' Time = "9 pm" Venue = "System Software Lab" Image = {Pictures.Pixels} Organizer = "Dr. Dimple Shajahan"></Event>
            <Event Name = "Hacknite" Date = '20-02-2025' Time = '1 pm' Venue = 'Baselios Mathews || College of Engineering' Image = {Pictures.Hacknite}></Event>
            <Event Name = "Innovex" Date = '23-02-2025' Time = "12 pm" Venue = "TKM College of Engineering" Image = {Pictures.Innovex} Organizer = "IEDC TKMCE"></Event>
            <Event Name = "Humanitarian Project Expo" Date = '01-03-2025' Time = "10:00 am" Venue = 'TKM College Of Engineering' Image = {Pictures.Expo} Organizer = "STEPS"></Event>
            <Event Name = "Strike !" Date = '11-02-2025 onwards' Time = "9 am - 4pm" Venue = "TKM College Front Gate" Image = {Pictures.Strike} Organizer = "SFI | UDSF | Student's Union"></Event>
            <Event Name = "Athena" Date = 'Coming Soon' Time = "" Venue = "" Image = {Pictures.Athena} Organizer = "ISTE"></Event>
            <Event Name = "Hestia" Date = 'Coming Soon' Time = "" Venue = "" Image = {Pictures.Hestia} Organizer = "TKM"></Event>
          </div>
        </div>
    </div>
  )
}

export default EventBanner
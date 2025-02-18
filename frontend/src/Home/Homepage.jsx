import React from 'react'
import './Homepage.css'
import Explore from '../Components/Explore/Explore.jsx'
import Section1 from '../Components/Section1/Section1.jsx'
import EventBanner from '../Components/Events/EventBanner.jsx'

function Homepage() {
  return (
    <div>
      <Explore/>
      <Section1/>
      <EventBanner/>
    </div>
  )
}

export default Homepage
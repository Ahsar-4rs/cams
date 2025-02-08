import React from 'react'
import './Homepage.css'
import Explore from '../../Components/Explore/Explore'
import Section1 from '../../Components/Section1/Section1'
import EventBanner from '../../Components/EventBanner/EventBanner'

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
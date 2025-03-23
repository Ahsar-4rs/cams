import React from 'react'
import OpenStreetMapOverlay from '../../Components/OpenStreetMapsOverlay/OpenStreetMapsOverlay'
import './Maps.css'

function Maps() {
  return (
    <div className='Maps'>
      <h1>
        TKM COLLEGE OF ENGINEERING
      </h1>
      <OpenStreetMapOverlay/>
    </div>
  )
}

export default Maps
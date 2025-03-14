import React from 'react'
import './Explore.css'
import assets from '../../assets/main-img/main-img'

function Explore() {
  return (
    <div className='explore'>
        <div className='explore-content'>
            <img src={assets.pic1} alt='main-img'/>
            <div className='info-box'>
                <h2>Stay Informed, Stay Safe</h2>
                <p>Your campus alert system at work</p>
            </div>
        </div>
    </div>
  )
}

export default Explore
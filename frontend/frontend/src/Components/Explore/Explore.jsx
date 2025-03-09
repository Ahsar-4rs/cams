import assets from '../../assets/main-img/main-img.jsx'
import './Explore.css'
import React from 'react'

function Explore() {
  return (
    <div className='Explore'>
        <div className='main-flex'>
            <div id='main-img'>
                <img src={assets.pic1} alt='main-img' id='grad'/>
            </div>
            <div className='content'>
                <div id='box1'>
                    <h2>Stay Informed, Stay Safe</h2> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default Explore
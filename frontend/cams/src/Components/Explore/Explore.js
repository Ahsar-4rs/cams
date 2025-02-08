import assets from '../../assets/main-img/main-img.js'
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
                    
                </div>
                <div id='box2'>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Explore
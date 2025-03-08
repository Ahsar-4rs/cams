import React from 'react'
import './Footer.css'
import facebook from './facebook.png'
import twitter from './twitter.png'
import instagram from './instagram.png'
import linkedin from './linkedin.png'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
            <h1 className='logo'>Campus Alert System</h1>
            <p>Stay informed, stay safe – your campus alert system at work.</p>
            <div className='footer-social-icons'>
                <img src={facebook} alt=''/>
                <img src={twitter} alt=''/>
                <img src={instagram} alt=''/>
                <img src={linkedin} alt=''/>
            </div>
        </div>
        <div className='footer-content-center'>
            <h2>Campus Alert System</h2>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About Us</Link></li>
                <li>Bills and Payments</li>
                <li><Link to='/privacy'>Privacy Policy</Link></li>
            </ul>
        </div>
        <div className='footer-content-right'>
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91-32434-34234</li>
                <li>tkmce@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2024 @school.com - All Rights Reserved</p>
    </div>
  )
}

export default Footer
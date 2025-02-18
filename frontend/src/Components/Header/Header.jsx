import React from 'react';
import './Header.css'
import logo from '../../assets/logo/logo-2.png'
import { Link } from 'react-router-dom';
function Header() {
  return (
    <div>
        <div id="wm-header" className="wm-header-one">
            <div className='Header'>
                <div id='logo-container'>
                    <img src={logo} id='logo-img' alt='logo'/>
                </div>
                <div className='horNav'>
                    <ul className='menu'>
                        <li><Link to="/">Home</Link></li>
                        <li>Announcements</li>
                        <li>Dashboard</li>
                        <li><Link to="/about">About</Link></li>
                        <li>Contact</li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Header
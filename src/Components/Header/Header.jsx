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
                        <Link to="/"><li>Home</li></Link>
                        <Link to="/EventPage"><li>Events</li></Link>
                        <Link><li>Account</li></Link>
                        <Link to="/About"><li>About</li></Link>
                        <Link to="/Contact"><li>Contact</li></Link>
                    </ul>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Header
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
                        <Link><li>Events</li></Link>
                        <Link><li>Account</li></Link>
                        <Link to="/about"><li>About</li></Link>
                        <a href='#footer'><li>Contact</li></a>
                    </ul>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Header
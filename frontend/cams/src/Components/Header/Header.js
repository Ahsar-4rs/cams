import React from 'react';
import './Header.css'
import logo from '../../assets/logo/logo-2.png'
function Header() {
  return (
    <div>
        <div id="wm-header" class="wm-header-one">
            <div className='Header'>
                <div id='logo-container'>
                    <img src={logo} id='logo-img' alt='logo'/>
                </div>
                <div className='horNav'>
                    <ul className='tabs'>
                        <li>Home</li>
                        <li>Announcements</li>
                        <li>Dashboard</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Header
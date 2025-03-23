import React from 'react';
import './Header.css';
import logo from '../../assets/logo/logo-2.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '../../context/SessionContext';

function Header() {
    const { isGuest, loginAs } = useSession();
    const navigate = useNavigate();

    const handleLogout = () => {
        loginAs('guest'); // Reset to guest privileges
        navigate('/'); // Redirect to login page
    };

    return (
        <div>
            <div id="wm-header" className="wm-header-one">
                <div className='Header'>
                    <div id='logo-container'>
                        <img src={logo} id='logo-img' alt='logo'/>
                    </div>
                    <div className='horNav'>
                        <ul className='menu'>
                            <Link to="/home"><li>Home</li></Link>
                            <Link to="/EventPage"><li>Events</li></Link>
                            {!isGuest && <Link to="/Account"><li>Account</li></Link>}
                            <Link to="/About"><li>About</li></Link>
                            <Link to="/Contact"><li>Contact</li></Link>
                            {isGuest ? (
                                <Link to="/"><li>Login</li></Link>
                            ) : (
                                <li onClick={handleLogout} className="logout-button">Logout</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;

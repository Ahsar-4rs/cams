import React from 'react'
import './Homepage.css'
import Explore from '../../Components/Explore/Explore.jsx'
import Section1 from '../../Components/Section1/Section1.jsx'
import EventBanner from '../../Components/Events/EventBanner.jsx'
import { useSession } from '../../context/SessionContext.jsx'
import { useNavigate } from 'react-router-dom'


function Homepage() {

  const { getCurrentAccessRights } = useSession();
  const rights = getCurrentAccessRights();
  const navigate = useNavigate();
  //console.log("User rights: ", rights);

  const handleAdminControls = () => {
    navigate('/admin-controls');
  }

  return (
    <div>
      <Explore/>
      <Section1/>
      {rights['canAlterSystem'] && (<button className='admin-button' onClick={handleAdminControls}>Admin Controls</button>
      )}
      <EventBanner/>
    </div>
  )
}

export default Homepage
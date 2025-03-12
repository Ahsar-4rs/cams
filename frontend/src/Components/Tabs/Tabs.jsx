import './Tabs.css'
import React from 'react'
import health from './health-icon.png'
import repair from './repair-icon.png'
import emergency from './emergency-icon.png'
import report from './report-icon.png'
import event from './event-icon.png'
import { Link } from 'react-router-dom'


function Tabs() {
  
  const tabs=[
    {
        name:"Health",
        icon:health,
        path:'/Health',
    },
    {
        name:"Infrastructure",
        icon:repair,
        path:'/Infra',
    },
    {
        name:"Emergency Amenities",
        icon:emergency,
        path:'/Emergency',
    },
    {
        name:"Social Events",
        icon:event,
        path:'/EventPage',
    },
    {
        name:"Reports",
        icon:report,
        path:'/Reports',
    }
  ]
  
  
  return (
    <div className='tabs'>

        
        {tabs.map((item,i)=>{
            
            return(
              <div className='category'>
                <Link to={item.path}>
                  <div className='content'>
                    <img src={item.icon} alt=''/>
                    <h3>{item.name}</h3>
                  </div>
                </Link> 
              </div>
              
            )
          })}
    </div>
  )
}

export default Tabs
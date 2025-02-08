import './Tabs.css'
import React from 'react'
import health from './health-icon.png'
import repair from './repair-icon.png'
import emergency from './emergency-icon.png'
import report from './report-icon.png'
import event from './event-icon.png'
const tabs=[
    {
        name:"Health",
        icon:health,
        path:'/',
    },
    {
        name:"Infrastructure",
        icon:repair,
        path:'/',
    },
    {
        name:"Emergency Amenities",
        icon:emergency,
        path:'/',
    },
    {
        name:"Social Events",
        icon:event,
        path:'/',
    },
    {
        name:"Report",
        icon:report,
        path:'/',
    }
]

function Tabs() {
  return (
    <div className='tabs'>

        
        {tabs.map((item,i)=>{
            
            return(
              <div className='category'>
                <div className='content'>
                    <img src={item.icon} alt=''/>
                    <h3>{item.name}</h3>
                </div> 
              </div>
              
            )
          })}
    </div>
  )
}

export default Tabs
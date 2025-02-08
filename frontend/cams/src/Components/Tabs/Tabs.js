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
    },
    {
        name:"Infrastructure",
        icon:repair,
    },
    {
        name:"Emergency Amenities",
        icon:emergency,
    },
    {
        name:"Social Events",
        icon:event,
    },
    {
        name:"Report",
        icon:report,
    }
]

function Tabs() {
  return (
    <div className='tabs'>

        
        {tabs.map((item,i)=>{
            
            return(
              <div className='category'>
                <div className='content'>
                    <img src={item.icon}/>
                    <h3>{item.name}</h3>
                </div> 
              </div>
              
            )
          })}
    </div>
  )
}

export default Tabs
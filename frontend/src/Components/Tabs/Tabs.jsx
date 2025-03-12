import './Tabs.css'
import React from 'react'
import health from './health-icon.png'
import repair from './repair-icon.png'
import emergency from './emergency-icon.png'
import report from './report-icon.png'
import event from './event-icon.png'
import { Link } from 'react-router-dom'
import { useSession } from '../../context/SessionContext'


function Tabs() {
    const { getCurrentAccessRights } = useSession();
    const rights = getCurrentAccessRights();
    
    const tabs = [
        {
            name: "Health",
            icon: health,
            path: '/Health',
            visible: rights.canAccessHealth
        },
        {
            name: "Infrastructure",
            icon: repair,
            path: '/Infra',
            visible: rights.canAccessInfra
        },
        {
            name: "Emergency Amenities",
            icon: emergency,
            path: '/Emergency',
            visible: rights.canAccessEmergency
        },
        {
            name: "Social Events",
            icon: event,
            path: '/EventPage',
            visible: rights.canManageEvents
        },
        {
            name: "Reports",
            icon: report,
            path: '/Reports',
            visible: rights.canAccessReports
        }
    ]
  
    // Get visible tabs count to determine if we need admin layout
    const visibleTabsCount = tabs.filter(tab => tab.visible).length;
    
    return (
        <div className={`tabs ${visibleTabsCount === 5 ? 'admin-tabs' : ''}`}>
            {tabs.filter(tab => tab.visible).map((item,i)=>{
                return(
                    <div className='category' key={i}>
                        <div className='tab-link-container'>
                            <Link to={item.path}>
                                <div className='content'>
                                    <img src={item.icon} alt=''/>
                                    <h3>{item.name}</h3>
                                </div>
                            </Link> 
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Tabs
import React from 'react'
import LoginRegister from '../LoginRegister/LoginRegister'
import Tabs from '../Tabs/Tabs'
import './Section1.css'
function Section1() {
  return (
    <div className='section1'>
        <div className='login'>
            <LoginRegister/>
        </div>
        <div className='tabs-part'>
            <Tabs/>
        </div>
    </div>
  )
}

export default Section1
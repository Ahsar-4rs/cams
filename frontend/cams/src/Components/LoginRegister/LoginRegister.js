import './LoginRegister.css'

import React, { useState } from 'react'

function LoginRegister() {
    const [currState,setCurrState]=useState("Login")

    const [formData,setFormData]=useState({
        username:"",
        password:"",
        email:""
    })

  return (
    <div className='login-register'>
        <div className='title'>
            <h2>Login</h2>
        
        </div>
        <div className='form-data'>
        <input type='text' name='username' value={formData.username} placeholder='Enter Username' required/>
        <input type='text' name='password' value={formData.password} placeholder='Enter Password' required/>
        </div>
        
        <div className='terms'>
        <input type='checkbox' name='consent' required/><label>I hereby accept all the given <a href='./privacy-policy.html' target='blank'>Terms and Conditions</a> specified.</label>
        </div>
        
        <button>Submit</button>
        
    </div>
  )
}

export default LoginRegister
import './LoginRegister.css'

import React, { useState } from 'react'

function LoginRegister() {
    const [action,setAction]=useState("Login")

    const [formData,setFormData]=useState({
        username:"",
        password:"",
        email:""
    })

    const registerLink =() =>{
      setAction('Register');
    };
    const loginLink =() =>{
      setAction('Login');
    };

  return (
    <div className={`loginRegister ${action === 'Register' ? 'signup' : 'signin'}`}>
           <div className='title'>
            <h2>{action}</h2>
        
        </div>
        <div className='form-data'>
        <input type='text' name='username' value={formData.username} placeholder='Enter Username' onChange={(e)=>setFormData({...formData,username:e.target.value})} required/>
        <input type='password' name='password' value={formData.password} placeholder='Enter Password'onChange={(e)=>setFormData({...formData,password:e.target.value})} required/>
        {action==='Register' &&(
          <input className={`email-input ${action === 'Register' ? 'show' : ''}`}  type='text' name='email' value={formData.email} placeholder='Enter Email' onChange={(e)=>setFormData({...formData,email:e.target.value})} required/>
        )}
        </div>
        
        <div className='terms'>
        <input  type='checkbox' name='consent' required/><label>I hereby accept all the given <a href='./privacy' target='blank'>Terms and Conditions</a> specified.</label>
        
        </div>
        
        <button>Submit</button>
        {action==='Login'?<p >Don't have an account?<a href='#signup' onClick={registerLink}>Register</a></p> : <p >Already have an account?<a href='#signin' onClick={loginLink}>login</a></p>}
      
       
    </div>
  )
}

export default LoginRegister
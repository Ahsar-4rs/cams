import './LoginRegister.css'
import {useUser} from '../../context/UserContext.jsx'
import React, { useState } from 'react'
import { useSession } from '../../context/SessionContext'
import { useNavigate } from 'react-router-dom'




function LoginRegister() {
    const [action,setAction]=useState("Login")
    const { loginAs } = useSession()
    const navigate = useNavigate()
    const { login } = useUser();
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

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (action === 'Login') {
            const response = await login(formData.email, formData.password, formData.role);
    
            if (response.success) {
                // Navigate to dashboard or home
                switch (formData.role.toLowerCase()) {
                    case 'student':
                        loginAs('student');
                        break;
                    case 'faculty':
                        loginAs('faculty');
                        break;
                    case 'club representative':
                        loginAs('clubRep');
                        break;
                    case 'admin':
                        loginAs('admin');
                        break;
                    default:
                        loginAs('guest');
                }
                navigate('/home');
            } else {
                alert(response.message);
            }
        } else {
            
            navigate('/home');
        }
    };
  return (
    <div className={`loginRegister ${action === 'Register' ? 'signup' : 'signin'}`}>
           <div className='title'>
            <h2>{action}</h2>
        
        </div>
        <div className='form-data'>
            <input type='text' name='email' value={formData.email} placeholder='Enter Email' onChange={(e)=>setFormData({...formData,email:e.target.value})} required/>
            <input type='password' name='password' value={formData.password} placeholder='Enter Password'onChange={(e)=>setFormData({...formData,password:e.target.value})} required/>
            {action==='Register' &&(
            <input className={`email-input ${action === 'Register' ? 'show' : ''}`}  type='text' name='username' value={formData.username} placeholder='Enter Email' onChange={(e)=>setFormData({...formData,username:e.target.value})} required/>
            )}
            <select name='role' value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required>
                <option value=''>Select Role</option>
                <option value='Student'>Student</option>
                <option value='Faculty'>Faculty</option>
                <option value='Club Representative'>Club Representative</option>
                <option value='Admin'>Admin</option>
            </select>
        </div>
        
        <div className='terms'>
        <input  type='checkbox' name='consent' required/><label>I hereby accept all the given <a href='./privacy' target='blank'>Terms and Conditions</a> specified.</label>
        
        </div>
        
        <form onSubmit={handleSubmit}>
            <button type="submit">Submit</button>
        </form>
        {action==='Login'?<p >Don't have an account?<a href='#signup' onClick={registerLink}>Register</a></p> : <p >Already have an account?<a href='#signin' onClick={loginLink}>login</a></p>}
      
       
    </div>
  )
}

export default LoginRegister
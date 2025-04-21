

//------------------------------------
import './LoginRegister.css';
import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

function LoginRegister() {
    const [action, setAction] = useState("Login");
    const { login, register } = useUser();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        role: ""
    });

    const registerLink = () => setAction('Register');
    const loginLink = () => setAction('Login');

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response;

        if (action === 'Login') {
            response = await login(formData.email, formData.password, formData.role);
        } else {
            response = await register(formData);
        }

        if (response.success) {
            navigate('/home');
        } else {
            alert(response.message);
        }
    };

    return (
        <div className={`loginRegister ${action === 'Register' ? 'signup' : 'signin'}`}> 
            <div className='title'>
                <h2>{action}</h2>
            </div>
            <div className='form-data'>
                {action === 'Register' && (
                    <input type='text' name='username' value={formData.username} placeholder='Enter Username' 
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
                )}
                <input type='email' name='email' value={formData.email} placeholder='Enter Email' 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                <input type='password' name='password' value={formData.password} placeholder='Enter Password' 
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                <select name='role' value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required>
                    <option value=''>Select Role</option>
                    <option value='General User'>General User</option>
                    <option value='Faculty'>Faculty</option>
                    <option value='Club Representative'>Club Representative</option>
                    <option value='Admin'>Admin</option>
                </select>
            </div>

            <div className='terms'>
                <input type='checkbox' name='consent' required />
                <label>I accept the <a href='./privacy' target='_blank'>Terms and Conditions</a>.</label>
            </div>

            <form onSubmit={handleSubmit}>
                <button type="submit">Submit</button>
            </form>
            {action === 'Login' ? (
                <p>Don't have an account? <a href='#signup' onClick={registerLink}>Register</a></p>
            ) : (
                <p>Already have an account? <a href='#signin' onClick={loginLink}>Login</a></p>
            )}
        </div>
    );
}

export default LoginRegister;





{/*
  {/*      <div className='MenuBar'>
        <ul>
          <li onClick={() => setMenu("GF")} className={menu === "GF" ? "active" : ""}>Ground Floor</li>
          <li onClick={() => setMenu("FF")} className={menu === "FF" ? "active" : ""}>First Floor</li>
          <li onClick={() => setMenu("SF")} className={menu === "SF" ? "active" : ""}>Second Floor</li>
        </ul>
      </div>
      {/* Pass selected floor as a prop */}
      {/*<OpenStreetMapOverlay selectedFloor={menu} />
  */}
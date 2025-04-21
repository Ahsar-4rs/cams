import React, { useState } from 'react';
import axios from 'axios';
import './add-user.css';

const AddUser = () => {
    const [formData, setFormData] = useState({
        Name: '',
        userImage: null,
        DOB: '',
        Gender: '',
        Address: '',
        MedicalHistory: '',
        email: '',
        phoneNo: '',
        username: '',
        password: '',
        role: '',
        Department: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            userImage: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        
        // Check if userImage is set; if not, use the default image
        const imageToSend = formData.userImage || "bgr.png";
        
        // Append all fields to FormData
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, key === "userImage" ? imageToSend : value);
        });
        
        console.log("Submitting Data:", formDataToSend); // Debugging line

        try {
            const response = await axios.post('http://localhost:4000/api/v1/user/register', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Response:", response);
            
            // Clear form data on success
            setFormData({
                Name: '',
                userImage: null,
                DOB: '',
                Gender: '',
                Address: '',
                MedicalHistory: '',
                email: '',
                phoneNo: '',
                username: '',
                password: '',
                role: '',
                Department: ''
            });
            
            alert("User registered successfully!"); // Success alert
        } catch (error) {
            console.error("Error during user registration:", error.response?.data || error.message);
            alert(error.response ? error.response.data.message : "An error occurred during registration.");
        } 
    };

    return (
        <div className="add-user-container">
            <h1>Add User</h1>
            <div className="add-user-form-wrapper">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="Name" placeholder="Name" value={formData.Name} onChange={handleChange} required />
                    <input type="file" name="userImage" accept="image/*" onChange={handleFileChange} />
                    <input type="date" name="DOB" value={formData.DOB} onChange={handleChange} required />
                    <select name="Gender" value={formData.Gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <input type="text" name="Address" placeholder="Address" value={formData.Address} onChange={handleChange} required />
                    <textarea name="MedicalHistory" placeholder="Medical History" value={formData.MedicalHistory} onChange={handleChange} required></textarea>
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input type="text" name="phoneNo" placeholder="Phone Number" value={formData.phoneNo} onChange={handleChange} required />
                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    <select name="role" value={formData.role} onChange={handleChange} required>
                        <option value="">Select Role</option>
                        <option value="General User">General User</option>
                        <option value="Faculty">Faculty</option>
                        <option value="Club Representative">Club Representative</option>
                        <option value="Admin">Admin</option>
                        <option value="Student">Student</option>
                    </select>
                    <input type="text" name="Department" placeholder="Department" value={formData.Department} onChange={handleChange} required />
                    <button type="submit">Register User</button>
                </form>
            </div>
        </div>
    );
};

export default AddUser;
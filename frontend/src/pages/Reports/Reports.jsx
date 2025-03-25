import React, { useState } from 'react';
import './Reports.css';

const Reports = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        phone: '',
        accommodation: '',
        hostel: '',
        department: '',
        semester: '',
        class: '',
        symptoms: '',
        onset: '',
        patientHistory: '',
        medicineIntake: '',
        socialGatherings: '',
        foodIntake: '',
        allergies: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    };

    /*const validateSemester = (semester) => {
        const semesterNum = parseInt(semester, 10);
        return semesterNum >= 1 && semesterNum <= 10;
    };
    */

    return (
        <div className="reports-container">
            <h1>Medical Report Form</h1>
            <form onSubmit={handleSubmit}>
                <h2>Biodata</h2>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                    Age:
                    <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                </label>
                <label>
                    Gender:
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </label>
                <label>
                    Phone No:
                    <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        required 
                        pattern="[0-9]{10}" 
                        title="Please enter a valid 10-digit phone number." 
                    />
                </label>
                <label>
                    Accommodation:
                    <select name="accommodation" value={formData.accommodation} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="day scholar">Day Scholar</option>
                        <option value="hostler">Hostler</option>
                    </select>
                </label>
                {formData.accommodation === 'hostler' && (
                    <label>
                        Hostel:
                        <select name="hostel" value={formData.hostel} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="H1">H1</option>
                            <option value="H2">H2</option>
                            <option value="H3">H3</option>
                        </select>
                    </label>
                )}
                <label>
                    Department:
                    <select name="department" value={formData.department} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="A">Architecture</option>
                        <option value="C">Civil Engineering</option>
                        <option value="H">Chemical Engineering</option>
                        <option value="R">Computer Science and Engineering</option>
                        <option value="AI">Computer Science with AI</option>
                        <option value="ER">Electrical and Computer Science</option>
                        <option value="T">Electronics and Communication Engineering</option>
                        <option value="E">Electrical and Electronics Engineering</option>
                        <option value="M">Mechanical Engineering</option>
                        <option value="P">Production Engineering</option>
                    </select>
                </label>
                
                {formData.department === 'A' ? (
                    <label>
                        Semester:
                        <select name="semester" value={formData.semester} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </label>
                ) : (
                    <label>
                        Semester:
                        <select name="semester" value={formData.semester} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                    </label>
                )}
                
                <label>
                    Class:
                    <select name="class" value={formData.class} onChange={handleChange} required>
                        <option value="">Select</option>
                        {formData.semester === '1' && (
                            <>
                                <option value={`${formData.department}1A`}>{`${formData.department}1A`}</option>
                                <option value={`${formData.department}1B`}>{`${formData.department}1B`}</option>
                                {formData.department === 'M' || formData.department === 'T' ? (
                                    <>
                                        <option value={`${formData.department}1C`}>{`${formData.department}1C`}</option>
                                    </>
                                ) : null}
                            </>
                        )}
                        {formData.semester === '2' && (
                            <>
                                <option value={`${formData.department}2A`}>{`${formData.department}2A`}</option>
                                <option value={`${formData.department}2B`}>{`${formData.department}2B`}</option>
                                {formData.department === 'M' || formData.department === 'T' ? (
                                    <>
                                        <option value={`${formData.department}2C`}>{`${formData.department}2C`}</option>
                                    </>
                                ) : null}
                            </>
                        )}
                        {formData.semester === '3' && (
                            <>
                                <option value={`${formData.department}3A`}>{`${formData.department}3A`}</option>
                                <option value={`${formData.department}3B`}>{`${formData.department}3B`}</option>
                                {formData.department === 'M' || formData.department === 'T' ? (
                                    <>
                                        <option value={`${formData.department}3C`}>{`${formData.department}3C`}</option>
                                    </>
                                ) : null}
                            </>
                        )}
                        {formData.semester === '4' && (
                            <>
                                <option value={`${formData.department}4A`}>{`${formData.department}4A`}</option>
                                <option value={`${formData.department}4B`}>{`${formData.department}4B`}</option>
                                {formData.department === 'M' || formData.department === 'T' ? (
                                    <>
                                        <option value={`${formData.department}4C`}>{`${formData.department}4C`}</option>
                                    </>
                                ) : null}
                            </>
                        )}
                        {formData.semester === '5' && (
                            <>
                                <option value={`${formData.department}5A`}>{`${formData.department}5A`}</option>
                                <option value={`${formData.department}5B`}>{`${formData.department}5B`}</option>
                                {formData.department === 'M' || formData.department === 'T' ? (
                                    <>
                                        <option value={`${formData.department}5C`}>{`${formData.department}5C`}</option>
                                    </>
                                ) : null}
                            </>
                        )}
                    </select>
                </label>

                <h2>Complaints</h2>
                <label>
                    Symptoms:
                    <textarea name="symptoms" value={formData.symptoms} onChange={handleChange} required />
                </label>
                <label>
                    Onset:
                    <input type="text" name="onset" value={formData.onset} onChange={handleChange} required />
                </label>

                <h2>Patient History</h2>
                <label>
                    History of Medicine Intake:
                    <textarea name="medicineIntake" value={formData.medicineIntake} onChange={handleChange} />
                </label>
                <label>
                    Recent Social Gatherings:
                    <textarea name="socialGatherings" value={formData.socialGatherings} onChange={handleChange} />
                </label>
                <label>
                    Recent Food Intake:
                    <textarea name="foodIntake" value={formData.foodIntake} onChange={handleChange} />
                </label>
                <label>
                    Known Allergies:
                    <textarea name="allergies" value={formData.allergies} onChange={handleChange} />
                </label>

                <button type="submit" disabled={!validatePhoneNumber(formData.phone)}>Submit Report</button>
            </form>
        </div>
    );
};

export default Reports; 
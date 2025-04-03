import React, { useState, useRef } from 'react';
import './Reports.css';
import axios from 'axios';
const Reports = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: 20,
        gender: '',
        phone: '',
        accommodation: '',
        hostel: '',
        roomNumber: '',
        department: '',
        semester: '',
        class: '',
        diagnosis: '',
        onset: '',
        medicineIntake: '',
        socialGatherings: '',
        foodIntake: '',
        allergies: '',
        level: 1
    });

    const [errors, setErrors] = useState({});
    const inputRefs = {
        name: useRef(null),
        age: useRef(null),
        gender: useRef(null),
        phone: useRef(null),
        accommodation: useRef(null),
        hostel: useRef(null),
        roomNumber: useRef(null),
        department: useRef(null),
        semester: useRef(null),
        class: useRef(null),
        diagnosis: useRef(null),
        onset: useRef(null),
        medicineIntake: useRef(null),
        socialGatherings: useRef(null),
        foodIntake: useRef(null),
        allergies: useRef(null)
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({ ...errors, [name]: '' }); // Clear error on change

        // Set level based on diagnosis
        if (name === 'diagnosis') {
            if (['food poisoning', 'gastroenteritis', 'otitis media', 'otitis externa', 'mumps', 'bronchitis', 'covid 19'].includes(value)) {
                setFormData(prevData => ({ ...prevData, level: 2 }));
                console.log('Level set to:', 2);
            } else if (['hepatitis', 'gbs', 'influenza', 'pneumonia', 'tuberculosis'].includes(value)) {
                setFormData(prevData => ({ ...prevData, level: 3 }));
                console.log('Level set to:', 3);
            } else {
                setFormData(prevData => ({ ...prevData, level: 1 }));
                console.log('Level set to:', 1);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submit button clicked!"); 
        console.log("Submitting Form Data:", formData);
        const newErrors = {};
        let hasError = false;
    
        // Validate required fields
        if (formData.name.length < 3) {
            newErrors.name = 'Name must contain at least 3 characters';
            hasError = true;
        }
        if (formData.age < 17) {
            newErrors.age = 'Age must be at least 17';
            hasError = true;
        }
        if (!['male', 'female'].includes(formData.gender)) {
            newErrors.gender = 'Gender must be Male or Female';
            hasError = true;
        }
        if (!validatePhoneNumber(formData.phone)) {
            newErrors.phone = 'Phone number must be a valid 10-digit number';
            hasError = true;
        }
        
        if (!formData.class) {
            newErrors.class = 'Class is required';
            hasError = true;
        }
        if (!formData.accommodation) {
            newErrors.accommodation = 'Accommodation is required';
            hasError = true;
        }
        if (!formData.diagnosis) {
            newErrors.diagnosis = 'Diagnosis is required';
            hasError = true;
        }
    
        if (hasError) {
            setErrors(newErrors);
            const firstErrorField = Object.keys(newErrors)[0];
            if (inputRefs[firstErrorField] && inputRefs[firstErrorField].current) {
                inputRefs[firstErrorField].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                inputRefs[firstErrorField].current.focus();
            }
            return;
        }
    
        try {
            const updatedFormData = { ...formData, level: formData.level || 1 }; 
            console.log("Submitting Form Data:", updatedFormData);
            const response = await axios.post('http://localhost:4000/api/v1/report/reportAlert', updatedFormData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.data.success) {
                alert("Health Alert Report Submitted Successfully!");
                setFormData({
                    name: '',
                    age: 20,
                    gender: '',
                    phone: '',
                    accommodation: '',
                    hostel: '',
                    roomNumber: '',
                    department: '',
                    semester: '',
                    class: '',
                    diagnosis: '',
                    onset: '',
                    medicineIntake: '',
                    socialGatherings: '',
                    foodIntake: '',
                    allergies: '',
                    level: 1
                });
            }
        } catch (error) {
            console.error("Error submitting report:", error);
            alert("Error submitting report. Please try again later.");
        }
    };
    

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    };

    return (
        <div className="reports-container">
            <h1>Medical Report Form</h1>
            <form onSubmit={handleSubmit}>
                <h2>Biodata</h2>
                <label>
                    Name
                    <input type="text" name="name" value={formData.name} onChange={handleChange} ref={inputRefs.name} required />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </label>
                <label>
                    Age
                    <input type="number" name="age" value={formData.age} onChange={handleChange} ref={inputRefs.age} required  min="10" max="100"/>
                    {errors.age && <span className="error-message">{errors.age}</span>}
                </label>
                <label>
                    Gender
                    <select name="gender" value={formData.gender} onChange={handleChange} ref={inputRefs.gender} required>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    {errors.gender && <span className="error-message">{errors.gender}</span>}
                </label>
                <label>
                    Phone Number
                    <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        ref={inputRefs.phone} 
                        required 
                        pattern="[0-9]{10}" 
                        title="Please enter a valid 10-digit phone number." 
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                </label>
                <label>
                    Department
                    <select name="department" value={formData.department} onChange={handleChange} ref={inputRefs.department} required>
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
                    {errors.department && <span className="error-message">{errors.department}</span>}
                </label>
                
                {formData.department === 'A' ? (
                    <label>
                        Semester
                        <select name="semester" value={formData.semester} onChange={handleChange} ref={inputRefs.semester} required>
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
                        {errors.semester && <span className="error-message">{errors.semester}</span>}
                    </label>
                ) : (
                    <label>
                        Semester
                        <select name="semester" value={formData.semester} onChange={handleChange} ref={inputRefs.semester} required>
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
                        {errors.semester && <span className="error-message">{errors.semester}</span>}
                    </label>
                )}
                
                <label>
                    Class
                    <select name="class" value={formData.class} onChange={handleChange} ref={inputRefs.class} required>
                        <option value="">Select</option>
                        {formData.department && (formData.semester === '1' || formData.semester === '2' || formData.semester === '3' || formData.semester === '4' || formData.semester === '5' || formData.semester === '6' || formData.semester === '7' || formData.semester === '8') && (
                            <>
                                <option value={`${formData.department}${formData.semester}A`}>{`${formData.department}${formData.semester}A`}</option>
                                <option value={`${formData.department}${formData.semester}B`}>{`${formData.department}${formData.semester}B`}</option>
                                {formData.department === 'M' || formData.department === 'T' ? (
                                    <option value={`${formData.department}${formData.semester}C`}>{`${formData.department}${formData.semester}C`}</option>
                                ) : null}
                            </>
                        )}
                        {formData.semester === '9' && (
                            <>
                                <option value={`A9A`}>{`A9A`}</option>
                                <option value={`A9B`}>{`A9B`}</option>
                            </>
                        )}
                        {formData.semester === '10' && (
                            <>
                                <option value={`A10A`}>{`A10A`}</option>
                                <option value={`A10B`}>{`A10B`}</option>
                            </>
                        )}
                    </select>
                </label>
                
                <br />

                <label>
                    Accommodation
                    <select name="accommodation" value={formData.accommodation} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="day scholar">Day Scholar</option>
                        <option value="hostler">Hostler</option>
                    </select>
                </label>
                {formData.accommodation === 'hostler' && (
                    <label>
                        Hostel
                        <select name="hostel" value={formData.hostel} onChange={handleChange} required>
                            <option value="">Select</option>
                            {formData.gender === 'female' && (formData.semester === '2' || formData.semester === '1') && (
                                <>
                                    <option value="LH">LH</option>
                                    <option value="Al-Ameen">Al-Ameen</option>
                                </>
                            )}
                            {formData.gender === 'female' && (formData.semester === '3' || formData.semester === '4' || formData.semester === '5' || formData.semester === '6' || formData.semester === '7' || formData.semester === '8') && (
                                <>
                                    <option value="UGC">UGC</option>
                                    <option value="Modern">Modern</option>
                                    <option value="Working Woman's">Working Woman's</option>
                                </>
                            )}
                            {formData.gender === 'male' && (formData.semester === '1' || formData.semester === '2') && (
                                <>
                                    <option value="Trust">Trust</option>
                                    <option value="INH">INH</option>
                                </>
                            )}
                            {formData.gender === 'male' && (formData.semester === '3' || formData.semester === '4') && (
                                <>
                                    <option value="Golden Jubilee">Golden Jubilee</option>
                                    <option value="INH">INH</option>
                                    <option value="Annexe">Annexe</option>
                                </>
                            )}
                            {formData.gender === 'male' && (formData.semester === '5' || formData.semester === '6' || formData.semester === '7' || formData.semester === '8') && (
                                <>
                                    <option value="Golden Jubilee">Golden Jubilee</option>
                                    <option value="INH">INH</option>
                                    <option value="Soumya">Soumya</option>
                                </>
                            )}
                        </select>
                    </label>
                )}

                {formData.accommodation === 'hostler' && (
                    <>
                        <label>
                            Room Number
                            <input 
                                type="text" 
                                name="roomNumber" 
                                value={formData.roomNumber} 
                                onChange={handleChange} 
                                required 
                            />
                        </label>
                    </>
                )}

                <br />

                <h2>Disease Information</h2>
                <label>
                    Diagnosis
                    <select name="diagnosis" value={formData.diagnosis} onChange={handleChange} ref={inputRefs.diagnosis} required>
                        <option value="">Select</option>
                        <option value="common cold">Common Cold</option>
                        <option value="covid 19">Covid 19</option>
                        <option value="diarrhea">Diarrhea</option>
                        <option value="food poisoning">Food Poisoning</option>
                        <option value="gastroenteritis">Gastroenteritis</option>
                        <option value="gbs">Gullain Barre Syndrome</option>
                        <option value="hepatitis">Hepatitis</option>
                        <option value="influenza">Influenza</option>
                        <option value="mumps">Mumps</option>
                        <option value="otitis externa">Otitis Externa</option>
                        <option value="otitis media">Otitis Media</option>
                        <option value="pneumonia">Pneumonia</option>
                        <option value="throat infection">Throat infection</option>
                        <option value="tonsillitis">Tonsillitis</option>
                        <option value="tuberculosis">Tuberculosis</option>
                        <option value="bronchitis">Viral Bronchitis</option>
                    </select>
                </label>
                
                <label>
                    Onset
                    <input type="text" name="onset" value={formData.onset} onChange={handleChange} required />
                </label>

                <h2>Patient History [Optional]</h2>
                <label>
                    History of Medicine Intake
                    <textarea name="medicineIntake" value={formData.medicineIntake} onChange={handleChange} />
                </label>
                <label>
                    Recent Social Gatherings
                    <textarea name="socialGatherings" value={formData.socialGatherings} onChange={handleChange} />
                </label>
                <label>
                    Recent Food Intake
                    <textarea name="foodIntake" value={formData.foodIntake} onChange={handleChange} />
                </label>
                <label>
                    Known Allergies
                    <textarea name="allergies" value={formData.allergies} onChange={handleChange} />
                </label>

                <button className="review-button" type="submit" disabled={!validatePhoneNumber(formData.phone)} title={!validatePhoneNumber(formData.phone) ? "Please enter a valid 10-digit phone number." : ""}>Review and Submit</button>
            </form>
        </div>
    );
};

export default Reports; 
import React, { useState, useRef } from 'react';
import './Reports.css';

const Reports = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        phone: '',
        accommodation: '',
        hostel: '',
        roomNumber: '',
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
        symptoms: useRef(null),
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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        let hasError = false;

        // Validate required fields
        for (const key in formData) {
            if (!formData[key] && key !== 'patientHistory' && key !== 'medicineIntake' && key !== 'socialGatherings' && key !== 'foodIntake' && key !== 'allergies') {
                newErrors[key] = 'This field is required';
                hasError = true;
            }
        }

        if (hasError) {
            setErrors(newErrors);
            // Scroll to the first error field
            const firstErrorField = Object.keys(newErrors)[0];
            inputRefs[firstErrorField].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

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
                    <input type="text" name="name" value={formData.name} onChange={handleChange} ref={inputRefs.name} required />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </label>
                <label>
                    Age:
                    <input type="number" name="age" value={formData.age} onChange={handleChange} ref={inputRefs.age} required />
                    {errors.age && <span className="error-message">{errors.age}</span>}
                </label>
                <label>
                    Gender:
                    <select name="gender" value={formData.gender} onChange={handleChange} ref={inputRefs.gender} required>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    {errors.gender && <span className="error-message">{errors.gender}</span>}
                </label>
                <label>
                    Phone No:
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
                    Department:
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
                        Semester:
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
                        Semester:
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
                    Class:
                    <select name="class" value={formData.class} onChange={handleChange} ref={inputRefs.class} required>
                        <option value="">Select</option>
                        {formData.semester === '1' && (
                            <>
                                <option value={`${formData.department}1A`}>{`${formData.department}1A`}</option>
                                <option value={`${formData.department}1B`}>{`${formData.department}1B`}</option>
                                {formData.department === 'M' || formData.department === 'T' ? (
                                    <option value={`${formData.department}1C`}>{`${formData.department}1C`}</option>
                                ) : null}
                            </>
                        )}
                        {formData.semester === '2' && (
                            <>
                                <option value={`${formData.department}2A`}>{`${formData.department}2A`}</option>
                                <option value={`${formData.department}2B`}>{`${formData.department}2B`}</option>
                                {formData.department === 'M' || formData.department === 'T' ? (
                                    <option value={`${formData.department}2C`}>{`${formData.department}2C`}</option>
                                ) : null}
                            </>
                        )}
                        {formData.semester === '3' && (
                            <>
                                <option value={`${formData.department}3A`}>{`${formData.department}3A`}</option>
                                <option value={`${formData.department}3B`}>{`${formData.department}3B`}</option>
                                {formData.department === 'M' || formData.department === 'T' ? (
                                    <option value={`${formData.department}3C`}>{`${formData.department}3C`}</option>
                                ) : null}
                            </>
                        )}
                        {formData.semester === '4' && (
                            <>
                                <option value={`${formData.department}4A`}>{`${formData.department}4A`}</option>
                                <option value={`${formData.department}4B`}>{`${formData.department}4B`}</option>
                                {formData.department === 'M' || formData.department === 'T' ? (
                                    <option value={`${formData.department}4C`}>{`${formData.department}4C`}</option>
                                ) : null}
                            </>
                        )}
                        {formData.semester === '5' && (
                            <>
                                <option value={`${formData.department}5A`}>{`${formData.department}5A`}</option>
                                <option value={`${formData.department}5B`}>{`${formData.department}5B`}</option>
                                {formData.department === 'M' || formData.department === 'T' ? (
                                    <option value={`${formData.department}5C`}>{`${formData.department}5C`}</option>
                                ) : null}
                            </>
                        )}
                        {formData.semester === '6' && (
                            <>
                                <option value={`${formData.department}6A`}>{`${formData.department}6A`}</option>
                                <option value={`${formData.department}6B`}>{`${formData.department}6B`}</option>
                                {formData.department === 'M' || formData.department === 'T' ? (
                                    <option value={`${formData.department}6C`}>{`${formData.department}6C`}</option>
                                ) : null}
                            </>
                        )}
                        {formData.semester === '7' && (
                            <>
                                <option value={`${formData.department}7A`}>{`${formData.department}7A`}</option>
                                <option value={`${formData.department}7B`}>{`${formData.department}7B`}</option>
                                {formData.department === 'M' || formData.department === 'T' ? (
                                    <option value={`${formData.department}7C`}>{`${formData.department}7C`}</option>
                                ) : null}
                            </>
                        )}
                        {formData.semester === '8' && (
                            <>
                                <option value={`${formData.department}8A`}>{`${formData.department}8A`}</option>
                                <option value={`${formData.department}8B`}>{`${formData.department}8B`}</option>
                                {formData.department === 'M' || formData.department === 'T' ? (
                                    <option value={`${formData.department}8C`}>{`${formData.department}8C`}</option>
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
                            Room Number:
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

                <h2>Complaints</h2>
                <label>
                    Symptoms:
                    <textarea name="symptoms" value={formData.symptoms} onChange={handleChange} required />
                </label>
                <label>
                    Onset:
                    <input type="text" name="onset" value={formData.onset} onChange={handleChange} required />
                </label>

                <h2>Patient History [Optional]</h2>
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

                <button type="submit" disabled={!validatePhoneNumber(formData.phone)}>Review and Submit</button>
            </form>
        </div>
    );
};

export default Reports; 
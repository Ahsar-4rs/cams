import React, { useState } from 'react';
import "./AddEvent.css";
import { toast } from 'react-toastify';
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
const AddEvent = () => {
    const [eventDetails, setEventDetails] = useState({
        Name: '',
        Date: '',
        Time: '',
        Venue: '',
        Image: null,
        Organizer: '',
        Body: '',
        Category: '',
        
    });

    const [message, setMessage] = useState('');

    const handleChange=(e)=>{
        setEventDetails({...eventDetails,[e.target.name]:e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { Name, Date, Time, Venue, Image, Organizer, Body, Category } = eventDetails;
    
        if (!Name || !Date || !Time || !Venue || !Organizer || !Body || !Category) {
            toast.error('Please fill in all required fields.');
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append("eventName", Name);
            formData.append("eventDate", Date);
            formData.append("eventTime", Time);
            formData.append("eventVenue", Venue);
            formData.append("organizer", Organizer);
            formData.append("eventInfo", Body);
            formData.append("Category", Category);
            if (Image) formData.append("eventImage", Image);
    
            const response = await axios.post(
                "http://localhost:4000/api/v1/socialEvent/postEvent",
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" }, // Required for file uploads
                }
            );
    
            toast.success(response.data.message);
            setEventDetails({
                Name: '',
                Date: '',
                Time: '',
                Venue: '',
                Image: null,
                Organizer: '',
                Body: '',
                Category: '',
            });
    
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
            console.error("Submission error:", error);
        }
    };

    return (
        <div className="add-event-container">
            <h2>Add Event</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="Name" placeholder="Event Name" value={eventDetails.Name} onChange={handleChange} required />
                
                <input type="date" name="Date" value={eventDetails.Date} onChange={handleChange} required />
                <input type="time" name="Time" value={eventDetails.Time} onChange={handleChange} />
                <input type="text" name="Venue" placeholder="Venue" value={eventDetails.Venue} onChange={handleChange} />
                
                <div className="image-upload-container">
                    <img 
                        src={eventDetails.Image ? URL.createObjectURL(eventDetails.Image) : 'placeholder-image-url.jpg'} 
                        alt="Image" 
                        className="image-preview" 
                    />
                    <div className="image-input">
                        <input 
                            type="file" 
                            name="Image" 
                            onChange={(e) => setEventDetails({ ...eventDetails, Image: e.target.files[0] })} 
                            required 
                        />
                    </div>
                </div>

                <input type="text" name="Organizer" placeholder="Organizer" value={eventDetails.Organizer} onChange={handleChange} required />
                <textarea name="Body" placeholder="Event Description" value={eventDetails.Body} onChange={handleChange} required />
                
                <select name="Category" value={eventDetails.Category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Conference">Conference</option>
                    <option value="Social Event">Social Event</option>
                </select>

                <button type="submit">Add Event</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddEvent;
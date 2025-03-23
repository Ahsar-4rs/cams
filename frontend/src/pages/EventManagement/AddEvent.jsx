import React, { useState } from 'react';
import "./AddEvent.css";

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
        Geolocation: { lat: '', lng: '' }
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Check if the input is for latitude or longitude
        if (name === "Geolocation.lat" || name === "Geolocation.lng") {
            setEventDetails({
                ...eventDetails,
                Geolocation: {
                    ...eventDetails.Geolocation,
                    [name.split('.')[1]]: value // Update the specific latitude or longitude
                }
            });
        } else {
            setEventDetails({ ...eventDetails, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { Name, Date, Time, Venue, Organizer, Body, Category } = eventDetails;

        // Check for required fields
        if (!Name || !Date || !Time || !Venue || !Organizer || !Body || !Category) {
            setMessage('Please fill in all required fields.');
            return;
        }

        // Reset the form fields
        setEventDetails({
            Name: '',
            Date: '',
            Time: '',
            Venue: '',
            Image: null,
            Organizer: '',
            Body: '',
            Category: '',
            Geolocation: { lat: '', lng: '' }
        });

        setMessage('Event added successfully!');
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

                <input type="text" name="Geolocation.lat" placeholder="Latitude" value={eventDetails.Geolocation.lat} onChange={handleChange} />
                <input type="text" name="Geolocation.lng" placeholder="Longitude" value={eventDetails.Geolocation.lng} onChange={handleChange} />
                <button type="submit">Add Event</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddEvent;
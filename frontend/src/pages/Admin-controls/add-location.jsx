import React, { useState } from "react";
import "./add-location.css";

function AddLocation() {
    const [locationformData, setLocationFormData] = useState({
        place: "",
        lat: "",
        long: "",
        type: ""
    });

    const [locationAdded, setLocationAdded] = useState(false); // Track success message

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setLocationFormData((prevData) => ({
            ...prevData,
            [name]: type === "number" ? Number(value) : value, // Allow 0 as a valid input
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!locationformData.place || locationformData.lat === "" || locationformData.long === "") {
            return;
        }
        if (locationformData.lat < -90 || locationformData.lat > 90) {
            alert("Latitude must be between -90 and 90 degrees."); 
            return;
        }
        if (locationformData.long < -180 || locationformData.long > 180) {
            alert("Longitude must be between -180 and 180 degrees.");
            return;
        }

        console.log("Location Added:", locationformData);

        try {
            const response = await fetch("http://localhost:4000/api/v1/area/api/areas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(locationformData),
            });

            if (!response.ok) {
                throw new Error("Failed to add location");
            }

            setLocationAdded(true);

            setTimeout(() => {
                setLocationAdded(false);
                setLocationFormData({ place: "", lat: "", long: "" });
            }, 2000);
        } catch (error) {
            console.error("Error adding location:", error);
        }
    };

    return (
        <div className="add-location-container">
            <h1>Add Location</h1>
            <div className="location-form-group">
                <form onSubmit={handleSubmit}>
                    <div className="location-form-elements">
                        <input
                            type="text"
                            name="place"
                            placeholder="Place"
                            value={locationformData.place}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            name="lat"
                            placeholder="Latitude (N:+, S:-)"
                            value={locationformData.lat}
                            step={0.001}
                            min={-90}
                            max={90}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            name="long"
                            placeholder="Longitude (W:+, E:-)"
                            value={locationformData.long}
                            step={0.001}
                            min={-180}
                            max={180}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="loc-submit-btn">Add Location</button>
                </form>
                {locationAdded && <p className="success-message">✅ Location Added Successfully!</p>}
            </div>
        </div>
    );
}

export default AddLocation;

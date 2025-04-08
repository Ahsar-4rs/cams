import React, { useState } from "react";
import "./ReportCard.css"; // Import the CSS file for styling

function ReportCard({ report }) {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="report-card" onClick={toggleDetails}>
            <div className="card-header">
                <h3>{report.name}</h3>
                <p className="diagnosis">Diagnosis: {report.diagnosis}</p>
            </div>
            {showDetails && (
                <div className="report-details">
                    <div className="detail-item"><strong>Age:</strong> {report.age}</div>
                    <div className="detail-item"><strong>Gender:</strong> {report.gender}</div>
                    <div className="detail-item"><strong>Phone:</strong> {report.phone}</div>
                    <div className="detail-item"><strong>Department:</strong> {report.department}</div>
                    <div className="detail-item"><strong>Semester:</strong> {report.semester}</div>
                    <div className="detail-item"><strong>Class:</strong> {report.class}</div>
                    <div className="detail-item"><strong>Accommodation:</strong> {report.accommodation}</div>
                    <div className="detail-item"><strong>Hostel:</strong> {report.hostel}</div>
                    <div className="detail-item"><strong>Room Number:</strong> {report.roomNumber}</div>
                    <div className="detail-item"><strong>Onset:</strong> {report.onset}</div>
                    <div className="detail-item"><strong>Medicine Intake:</strong> {report.medicineIntake}</div>
                    <div className="detail-item"><strong>Social Gatherings:</strong> {report.socialGatherings}</div>
                    <div className="detail-item"><strong>Food Intake:</strong> {report.foodIntake}</div>
                    <div className="detail-item"><strong>Allergies:</strong> {report.allergies}</div>
                    <div className="detail-item"><strong>Status:</strong> {report.status}</div>
                    <div className="detail-item"><strong>Level:</strong> {report.level}</div>
                </div>
            )}
        </div>
    );
}

export default ReportCard; 
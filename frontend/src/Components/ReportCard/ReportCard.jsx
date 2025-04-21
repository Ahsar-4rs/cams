import React, { useState } from "react";
import "./ReportCard.css"; // Import the CSS file for styling
import { useSession } from "../../context/SessionContext";
import { useUser } from "../../context/UserContext";

function ReportCard({ report, onReportDeleted }) {
    const [showDetails, setShowDetails] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const { isAdmin, isFaculty } = useSession();
    const { user } = useUser();

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const handleCardClick = (e) => {
        // Prevent clicking the card when clicking on buttons
        if (e.target.tagName !== 'BUTTON') {
            toggleDetails();
        }
    };

    const handleVouch = async (e) => {
        e.stopPropagation();
        if (isProcessing) return;
        
        setIsProcessing(true);
        try {
            const response = await fetch("http://localhost:4000/api/v1/report/vouchReport", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    alertId: report._id,
                    userName: user?.Name || user?.username || "Unknown User"
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to vouch report");
            }

            const data = await response.json();
            // Update report status locally
            report.status = 1;
            report.vouchedBy = user?.Name || user?.username || "Unknown User";
            alert("Report vouched successfully");
        } catch (error) {
            console.error("Error vouching report:", error);
            alert("Failed to vouch report: " + error.message);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReject = async (e) => {
        e.stopPropagation();
        if (isProcessing) return;
        
        setIsProcessing(true);
        try {
            const response = await fetch("http://localhost:4000/api/v1/report/rejectReport", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    alertId: report._id,
                    userName: user?.Name || user?.username || "Unknown User"
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to reject report");
            }

            const data = await response.json();
            // Update report status locally
            report.status = 2;
            report.vouchedBy = user?.Name || user?.username || "Unknown User";
            alert("Report rejected successfully");
        } catch (error) {
            console.error("Error rejecting report:", error);
            alert("Failed to reject report: " + error.message);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        if (isProcessing) return;
        
        if (!confirm("Are you sure you want to delete this report? This action cannot be undone.")) {
            return;
        }
        
        setIsProcessing(true);
        try {
            const response = await fetch("http://localhost:4000/api/v1/report/deleteReport", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    alertId: report._id
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to delete report");
            }

            alert("Report deleted successfully");
            
            // Notify parent component that this report was deleted
            if (onReportDeleted) {
                onReportDeleted(report._id);
            }
        } catch (error) {
            console.error("Error deleting report:", error);
            alert("Failed to delete report: " + error.message);
        } finally {
            setIsProcessing(false);
        }
    };

    // Determine if the buttons should be enabled
    const canVouch = isAdmin ? report.status !== 1 : (isFaculty && report.status === 0);
    const canReject = isAdmin ? report.status !== 2 : (isFaculty && report.status === 0);
    const canDelete = report.status === 1 || report.status === 2;

    // Determine the status text
    const getStatusText = () => {
        switch(report.status) {
            case 0: return "Pending";
            case 1: return "Vouched";
            case 2: return "Rejected";
            default: return "Unknown";
        }
    };

    return (
        <div className="report-card" onClick={handleCardClick}>
            <div className="card-header">
                <h3>{report.name}</h3>
                <div className="report-summary">
                    <p className="diagnosis"><strong>Diagnosis:</strong> {report.diagnosis}</p>
                    <p className="level"><strong>Level:</strong> {report.level}</p>
                    <p className="status"><strong>Status:</strong> {getStatusText()}</p>
                </div>
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
                    <div className="detail-item"><strong>Status:</strong> {getStatusText()}</div>
                    <div className="detail-item"><strong>Level:</strong> {report.level}</div>
                    {report.vouchedBy && (
                        <div className="detail-item"><strong>Vouched/Rejected By:</strong> {report.vouchedBy}</div>
                    )}
                    
                    <div className="action-buttons">
                        <button 
                            className={`vouch-button ${!canVouch ? 'disabled' : ''}`}
                            onClick={handleVouch}
                            disabled={!canVouch || isProcessing}
                        >
                            Vouch
                        </button>
                        <button 
                            className={`reject-button ${!canReject ? 'disabled' : ''}`}
                            onClick={handleReject}
                            disabled={!canReject || isProcessing}
                        >
                            Reject
                        </button>
                        {canDelete && (
                            <button 
                                className="delete-button"
                                onClick={handleDelete}
                                disabled={isProcessing}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReportCard; 
import React, { useEffect, useState } from "react";
import { useSession } from "../../context/SessionContext"; // Adjust the import path as necessary
import "./Vouch.css"; // Import the CSS file for styling
import ReportCard from "../../Components/ReportCard/ReportCard"; // Adjust the import path as necessary

function Vouch() {
    const { privilegeLevel, isAdmin, isFaculty } = useSession(); 
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const endpoint = privilegeLevel === 4 
                ? "http://localhost:4000/api/v1/report/getAllReport" 
                : "http://localhost:4000/api/v1/report/getSomeReport";

            const response = await fetch(endpoint, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch reports");
            }

            const data = await response.json();
            console.log("Fetched data:", data);

            if (data.success && Array.isArray(data.reports)) {
                setReports(data.reports);
            } else {
                console.error("Unexpected data format:", data);
                setError("Unexpected data format received.");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [privilegeLevel]);

    const handleReportDeleted = (reportId) => {
        setReports(reports.filter(report => report._id !== reportId));
    };

    const handleDeleteAllProcessed = async (status) => {
        if (!confirm(`Are you sure you want to delete all ${status === 1 ? "vouched" : "rejected"} reports? This action cannot be undone.`)) {
            return;
        }
        
        setIsDeleting(true);
        try {
            const response = await fetch("http://localhost:4000/api/v1/report/deleteAllProcessedReports", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error(`Failed to delete ${status === 1 ? "vouched" : "rejected"} reports`);
            }

            const data = await response.json();
            alert(data.message);
            
            // Refresh the reports list
            fetchReports();
        } catch (error) {
            console.error("Error deleting reports:", error);
            alert("Failed to delete reports: " + error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    // Count vouched and rejected reports
    const vouchedCount = reports.filter(report => report.status === 1).length;
    const rejectedCount = reports.filter(report => report.status === 2).length;

    return (
        <div className="vouch-container">
            <div className="vouch-header">
                <h1>Health Reports</h1>
                <p className="description">
                    {isAdmin ? 
                        "As an administrator, you can review, vouch, or reject all health reports." :
                        "Review pending health reports and mark them as vouched or rejected."}
                </p>
                <div className="action-toolbar">
                    <button className="refresh-button" onClick={fetchReports}>
                        Refresh Reports
                    </button>
                    
                    {(vouchedCount > 0 || rejectedCount > 0) && (
                        <div className="bulk-actions">
                            {vouchedCount > 0 && (
                                <button 
                                    className="delete-all-button vouched"
                                    onClick={() => handleDeleteAllProcessed(1)}
                                    disabled={isDeleting}
                                >
                                    Delete All Vouched ({vouchedCount})
                                </button>
                            )}
                            
                            {rejectedCount > 0 && (
                                <button 
                                    className="delete-all-button rejected"
                                    onClick={() => handleDeleteAllProcessed(2)}
                                    disabled={isDeleting}
                                >
                                    Delete All Rejected ({rejectedCount})
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
            
            {loading && <div className="loading">Loading reports...</div>}
            
            {error && <div className="error-message">Error: {error}</div>}
            
            {!loading && reports.length === 0 && (
                <div className="no-reports">
                    <p>No reports available at this time.</p>
                </div>
            )}
            
            {reports.length > 0 && (
                <div className="report-list">
                    {reports.map((report) => (
                        <ReportCard 
                            key={report._id} 
                            report={report} 
                            onReportDeleted={handleReportDeleted}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Vouch;
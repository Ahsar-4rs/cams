import React, { useEffect, useState } from "react";
import { useSession } from "../../context/SessionContext"; // Adjust the import path as necessary
import "./Vouch.css"; // Import the CSS file for styling
import ReportCard from "../../Components/ReportCard/ReportCard"; // Adjust the import path as necessary

function Vouch() {
    const { privilegeLevel } = useSession(); // Get the current user's privilege level
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
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
            }
        };

        fetchReports();
    }, [privilegeLevel]);

    return (
        <div>
            <h1>Vouch</h1>
            {error && <p>Error: {error}</p>}
            {reports.length > 0 ? (
                <div className="report-list">
                    {reports.map((report) => (
                        <ReportCard key={report.AlertID} report={report} />
                    ))}
                </div>
            ) : (
                <p>No reports available.</p>
            )}
        </div>
    );
}

export default Vouch;
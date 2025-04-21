import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OutbreakAlert.css';

const OutbreakAlert = () => {
    const [outbreakData, setOutbreakData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchOutbreakStatus = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/report/outbreak-status');
                setOutbreakData(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching outbreak status:', err);
                setError('Failed to fetch outbreak information');
                setLoading(false);
            }
        };
        
        fetchOutbreakStatus();
        // Set interval to check every 30 minutes
        const intervalId = setInterval(fetchOutbreakStatus, 30 * 60 * 1000);
        
        return () => clearInterval(intervalId);
    }, []);
    
    if (loading) return null;
    if (error) return null;
    if (!outbreakData || !outbreakData.hasOutbreak) return null;
    
    return (
        <div className="outbreak-alert">
            <div className="outbreak-header">
                <h2>⚠️ HEALTH ALERT: Disease Outbreak Detected ⚠️</h2>
            </div>
            <div className="outbreak-content">
                {outbreakData.outbreaks.map((outbreak, index) => (
                    <div key={index} className={`outbreak-item level-${outbreak.level}`}>
                        <p><strong>{outbreak.disease.toUpperCase()}</strong> outbreak detected (Level {outbreak.level})</p>
                        <p>Current cases: {outbreak.count}</p>
                    </div>
                ))}
                <p className="outbreak-instructions">
                    Please take necessary precautions. Health advisories have been sent to all departments.
                </p>
            </div>
        </div>
    );
};

export default OutbreakAlert; 
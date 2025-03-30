import React, { useEffect, useState } from "react";
import "./PeerSupport.css";
import { useNavigate } from "react-router-dom";

const PeerSupport = () => {
  const [diseases, setDiseases] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newDisease, setNewDisease] = useState("");
  const [newSymptoms, setNewSymptoms] = useState("");
  const [newPrescriptions, setNewPrescriptions] = useState("");
  const navigate = useNavigate();

  // Fetch disease groups from backend
  useEffect(() => {
    const fetchDiseaseGroups = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/group/fetchgroups");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setDiseases(data);
      } catch (error) {
        console.error("Error fetching disease groups:", error);
      }
    };
  
    fetchDiseaseGroups();
  }, []);
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/v1/group/addgroup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        disease: newDisease,
        symptoms: newSymptoms,
        prescriptions: newPrescriptions
      })
    });

    const data = await response.json();
    if (data.success) {
      alert("Disease Group Added!");
      setDiseases([...diseases, data.group]); // Update UI
      setShowForm(false); // Close modal
      setNewDisease("");
      setNewSymptoms("");
      setNewPrescriptions("");
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <div className="peer-container">
      <h1 className="peer-title">Select a Support Group</h1>
      
      <div className="group-list">
        {diseases.map((group) => (
          <button
            key={group.groupID}
            className="support-group-button"
            onClick={() => navigate(`/chat/${group.groupID}`)}
          >
            {group.disease}
          </button>
        ))}

        {/* Add Disease Button */}
        <button className="add-group-button" onClick={() => setShowForm(true)}>➕</button>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Disease Group</h2>
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                placeholder="Disease Name" 
                value={newDisease} 
                onChange={(e) => setNewDisease(e.target.value)} 
                required
              />
              <input 
                type="text" 
                placeholder="Symptoms" 
                value={newSymptoms} 
                onChange={(e) => setNewSymptoms(e.target.value)} 
                required
              />
              <input 
                type="text" 
                placeholder="Prescriptions" 
                value={newPrescriptions} 
                onChange={(e) => setNewPrescriptions(e.target.value)} 
              />
              <div className="modal-buttons">
                <button type="submit">Add Group</button>
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeerSupport;

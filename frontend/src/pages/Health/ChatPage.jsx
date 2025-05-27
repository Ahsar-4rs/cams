import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ChatPage.css";
import progressBar from "./progressBar.png";

const ChatPage = () => {
  const { groupID } = useParams();
  const [diseaseName, setDiseaseName] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [recoveryRate, setRecoveryRate] = useState(0);
  const textareaRef = useRef(null);

  // ✅ Get user from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const senderName = user?.Name || "User";
  // Fetch disease name based on `groupID`
  useEffect(() => {
    const fetchDiseaseName = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/group/${groupID}`);
        if (!response.ok) throw new Error("Failed to fetch disease name");
        
        const data = await response.json();
        if (data.disease) {
          setDiseaseName(data.disease);
        } else {
          setDiseaseName("Unknown Disease"); // Default if disease name is missing
        }
      } catch (error) {
        console.error("Error fetching disease name:", error);
        setDiseaseName("Error loading");
      }
    };

    fetchDiseaseName();
}, [groupID]);


  // Fetch messages for the given `groupID`
  useEffect(() => {
    
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/message/${groupID}`);
        if (!response.ok) throw new Error(`Failed to fetch messages. Status ${response.status}`);
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [groupID]);

  // Send a normal message
  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
      const messageData = {
        groupID,
        sender: senderName, // ✅ Use name from localStorage
        message: newMessage,
        recoveryRate: null,
      };
  
      try {
        const response = await fetch("http://localhost:4000/api/v1/message/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(messageData),
        });
  
        const result = await response.json();
        if (result.success) {
          setMessages([...messages, messageData]);
          setNewMessage("");
          autoResize(true);
        } else {
          console.error("Error sending message:", result.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  

  // Send a recovery rate update
  const sendRecoveryRate = async () => {
    const recoveryMessage = {
      groupID,
      sender: senderName, // ✅ Use name from localStorage
      message: `Recovery Rate: ${recoveryRate}%`,
      recoveryRate: recoveryRate,
    };
  
    try {
      const response = await fetch("http://localhost:4000/api/v1/message/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recoveryMessage),
      });
  
      const result = await response.json();
      if (result.success) {
        setMessages([...messages, recoveryMessage]);
        setShowProgressBar(false);
      } else {
        console.error("Error sending recovery update:", result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  // Auto-resize textarea
  const autoResize = (reset = false) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = reset ? "40px" : `${textarea.scrollHeight}px`;
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <p>Support Group: {diseaseName || "Loading..."}</p> {/* Show Disease Name */}
      </div>
      <div className="chat-messages">
      {messages.map((msg, index) => (
        <div key={index} className="chat-bubble">
          {msg.message && !msg.recoveryRate && (
            <div>{msg.sender}: {msg.message}</div>
          )}
          {msg.recoveryRate !== null && msg.recoveryRate !== undefined && (
            <div>{msg.sender}: Recovery Rate - {msg.recoveryRate}%</div>
          )}
        </div>
      ))}
      </div>
      <div className="chat-input">
        <textarea
          ref={textareaRef}
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            autoResize();
          }}
          rows="1"
          className="chat-textarea"
        ></textarea>

        <div className="recovery-container">
          <img
            src={progressBar}
            alt="progress"
            className="progress-button"
            onClick={() => setShowProgressBar(true)}
          />
        </div>

        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>

      {showProgressBar && (
        <div className="progress-container">
          <input
            type="range"
            min="0"
            max="100"
            value={recoveryRate}
            onChange={(e) => setRecoveryRate(e.target.value)}
            className="progress-bar"
          />
          <span>{recoveryRate}%</span>
          <button onClick={sendRecoveryRate} className="progress-submit">
            ✔
          </button>
          <p>Recovery Rate</p>
        </div>
      )}
    </div>
  );
};

export default ChatPage;

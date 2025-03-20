import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./ChatPage.css";
import progressBar from "./progressBar.png";

const ChatPage = () => {
  const { disease } = useParams(); 
  const [messages, setMessages] = useState([]); 
  const [newMessage, setNewMessage] = useState(""); 
  const [showProgressBar, setShowProgressBar] = useState(false); 
  const [recoveryRate, setRecoveryRate] = useState(0); 
  const textareaRef = useRef(null); 
  
  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, newMessage]); 
      setNewMessage(""); 
      autoResize(true); 
    }
  };

 
  const sendRecoveryRate = () => {
    setMessages([...messages, `Recovery Rate: ${recoveryRate}%`]); 
    setShowProgressBar(false); 
  };

 
  const autoResize = (reset = false) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto"; 
    textarea.style.height = reset ? "40px" : `${textarea.scrollHeight}px`; 
  };

  return (
    <div className="chat-container">
     
      <div className="chat-header">
        <p>{disease}</p>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-bubble">
            {msg}
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

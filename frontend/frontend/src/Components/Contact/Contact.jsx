import React from 'react';
import './Contact.css';
import phone from './phone.png';
import address from './address.jpg';
import email from './email.png';

function Contact() {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-info">
        <div className="location">
          <img className="contact-image" src={address} alt="Address" />
          <h2>Address</h2>
          <p>TKM College of Engineering,<br/>
            Karicode, Kollam-691005, <br/>
            Kerala, India
          </p>
        </div>

        <div className="number">
          <img className="contact-image" src={phone} alt="Phone" />
          <h2>Phone</h2>
          <p>+91-32434-34234</p>
        </div>

        <div className="email">
          <img className="contact-image" src={email} alt="Email" />
          <h2>Email</h2>
          <p>tkmce@gmail.com</p>
        </div>
      </div>

      <div className="contact-form">
        <form>
          <h2>Send Message</h2>
          <div className="inputBox">
            <span>Full Name</span>
            <input type="text" required />
          </div>
          <div className="inputBox">
            <span>Email</span>
            <input type="email" required />
          </div>
          <div className="inputBox">
            <span>Type your Message</span>
            <textarea required></textarea>
          </div>
          <div className="inputBox">
            <input type="submit" value="Send" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;

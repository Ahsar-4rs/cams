import { User } from '../models/userSchema.js';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

export const sendOutbreakAlert = async (req, res) => {
  try {
    const { diseaseType, location, symptoms } = req.body;

    // Fetch user phone numbers
    const users = await User.find({}, 'phoneNo');
    const phoneNumbers = users.map((user) => user.phoneNo);

    // Create a neutral alert message
    const message = `Alert! A ${diseaseType} outbreak has been reported in ${location}. Symptoms to monitor: ${symptoms}. Stay safe and take necessary precautions.`;

    // Ensure phone numbers are in the correct format (E.164)
    const formattedNumbers = phoneNumbers.map((number) => {
      if (!number.startsWith('+')) {
        return `+91${number}`; // Default to India code. Change as needed.
      }
      return number;
    });

    // Send SMS using Textbelt Free API (https://textbelt.com)
    const sendMessages = formattedNumbers.map((number) =>
      axios.post('https://textbelt.com/text', {
        phone: number,
        message: message,
        key: 'textbelt' // Use "textbelt" for the free tier (1 SMS/day)
      })
    );

    // Wait for all messages to attempt
    await Promise.all(sendMessages);

    res.status(200).json({
      success: true,
      message: 'Alerts attempted to all users (check free API limits)',
    });
  } catch (error) {
    console.error('SMS sending error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to send SMS alerts',
    });
  }
};
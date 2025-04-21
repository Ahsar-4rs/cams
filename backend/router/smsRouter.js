import express from 'express';
import { sendOutbreakAlert } from '../controller/smsController.js';

const router = express.Router();

router.post('/send-alert', sendOutbreakAlert);

export default router;
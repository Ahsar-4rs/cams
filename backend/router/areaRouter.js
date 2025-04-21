import express from 'express';
import { createArea, getAreas } from '../controller/areaController.js';

const router = express.Router();

router.post('/post-areas', createArea);
router.get('/get-areas', getAreas);

export default router;

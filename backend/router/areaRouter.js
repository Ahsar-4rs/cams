import express from 'express';
import { createArea, getAreas } from '../controller/areaController.js';

const router = express.Router();

router.post('/api/areas', createArea);
router.get('/api/areas', getAreas);

export default router;

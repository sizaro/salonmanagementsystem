import express from 'express';
const router = express.Router();

import { openSalonSession, closeSalonSession, getSalonStatus } from '../controllers/sessionsController.js';


router.post('/', openSalonSession);

router.put('/', closeSalonSession);

router.get('/status', getSalonStatus)

export default router;

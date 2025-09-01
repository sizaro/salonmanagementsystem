import express from 'express';
const router = express.Router();

import { openSalonSession, closeSalonSession } from '../controllers/sessionsController.js';

router.post('/', openSalonSession);

router.put('/', closeSalonSession);

export default router;

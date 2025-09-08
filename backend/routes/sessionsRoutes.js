import express from 'express';
const router = express.Router();

import { openSalonSession, closeSalonSession, getSalonSession } from '../controllers/sessionsController.js';


router.post('/', openSalonSession);

router.put('/', closeSalonSession);

router.get('/', getSalonSession)

export default router;

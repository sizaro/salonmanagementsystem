
import express from 'express';
const router = express.Router();

import { createClocking, updateClocking } from '../controllers/clockingsController.js';

router.post('/', createClocking);

router.put('/', updateClocking);

export default router;


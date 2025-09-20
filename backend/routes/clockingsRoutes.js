
import express from 'express';
const router = express.Router();

import { createClocking, updateClocking, getAllClocking } from '../controllers/clockingsController.js';

router.post('/', createClocking);

router.put('/', updateClocking);

router.get('/', getAllClocking);

export default router;


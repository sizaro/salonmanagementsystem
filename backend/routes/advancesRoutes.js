import express from 'express'
const router = express.Router();
import {createAdvance, getAllAdvances }from '../controllers/advancesController.js';

router.post('/', createAdvance);
router.get('/', getAllAdvances)

export default router

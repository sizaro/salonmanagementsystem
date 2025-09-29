import express from 'express'
const router = express.Router();
import {getWeeklyReport }from '../controllers/weeklyController.js';

router.get('/weekly', getWeeklyReport);

export default router

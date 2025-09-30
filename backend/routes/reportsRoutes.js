import express from 'express'
const router = express.Router();
import {getWeeklyReport }from '../controllers/weeklyController.js';
import {getMonthlyReport }from '../controllers/MonthlyController.js';

router.get('/weekly', getWeeklyReport);
router.get('/monthly', getMonthlyReport);

export default router

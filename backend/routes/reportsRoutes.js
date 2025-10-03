import express from 'express'
const router = express.Router();
import {getDailyReport }from '../controllers/dailyController.js';
import {getWeeklyReport }from '../controllers/weeklyController.js';
import {getMonthlyReport }from '../controllers/monthlyController.js';
import { getYearlyReport } from "../controllers/yearlyController.js";


router.get('/daily', getDailyReport);
router.get('/weekly', getWeeklyReport);
router.get('/monthly', getMonthlyReport);
router.get("/yearly", getYearlyReport);

export default router


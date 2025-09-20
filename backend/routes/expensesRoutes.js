import express from 'express'
const router = express.Router();
import {createExpense, getAllExpenses }from '../controllers/expensesController.js';

router.post('/', createExpense);
router.get('/', getAllExpenses);

export default router

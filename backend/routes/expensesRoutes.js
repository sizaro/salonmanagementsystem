import express from 'express'
const router = express.Router();
import {createExpense }from '../controllers/expensesController.js';

router.post('/', createExpense);

export default router

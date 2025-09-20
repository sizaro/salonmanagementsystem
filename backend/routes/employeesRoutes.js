import express from 'express'
const router = express.Router();
import {getAllEmployees }from '../controllers/employeesController.js';

router.get('/', getAllEmployees);

export default router

import express from 'express'
const router = express.Router();
import {createAdvance }from '../controllers/advancesController.js';

router.post('/', createAdvance);

export default router

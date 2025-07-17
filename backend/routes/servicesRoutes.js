import express from 'express'
const router = express.Router();
import {createService }from '../controllers/servicesController.js';

router.post('/', createService);

export default router

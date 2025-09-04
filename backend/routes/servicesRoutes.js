import express from 'express'
const router = express.Router();
import {createService, getAllServices }from '../controllers/servicesController.js';

router.post('/', createService);
router.get('/', getAllServices);

export default router

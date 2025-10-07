import express from 'express';
const router = express.Router();
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from '../controllers/servicesController.js';


router.post('/', createService);

router.get('/', getAllServices);

router.get('/:id', getServiceById);

router.put('/:id', updateService);

router.delete('/:id', deleteService);

export default router;

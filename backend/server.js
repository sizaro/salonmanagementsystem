import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

import servicesRoutes from './routes/servicesRoutes.js';
import expensesRoutes from './routes/expensesRoutes.js';
import advancesRoutes from './routes/advancesRoutes.js';
import clockingsRoutes from './routes/clockingsRoutes.js';
import sessionsRoutes from './routes/sessionsRoutes.js';
import employeesRoutes from './routes/employeesRoutes.js';
import reportsRoutes from './routes/reportsRoutes.js';

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://salonmanagementsystem.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

app.use('/api/services', servicesRoutes);
app.use('/api/expenses', expensesRoutes);
app.use('/api/advances', advancesRoutes);
app.use('/api/clockings', clockingsRoutes);
app.use('/api/sessions', sessionsRoutes);
app.use('/api/employees', employeesRoutes);
app.use('/api/reports', reportsRoutes);


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

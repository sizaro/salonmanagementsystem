import express from 'express'
import cors from 'cors'
import database from './models/database.js'
import dotenv from 'dotenv';
dotenv.config();

import servicesRoutes from './routes/servicesRoutes.js'
import expensesRoutes from './routes/expensesRoutes.js'

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/services', servicesRoutes);
app.use('/api/expenses', expensesRoutes);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

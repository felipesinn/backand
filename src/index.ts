import express from 'express';
const cors = require('cors');
const dotenv = require('dotenv');
import userRoutes from './routes/userRoutes'

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

app.listen(3001, () => {
  console.log('🚀 Servidor rodando em http://localhost:3001');
});

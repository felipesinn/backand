import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundHandler } from './middlewares/notFoundHandler';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Configuração do CORS
app.use(cors()); // Permite todas as origens, você pode customizar para restringir

// Configuração do logger (morgan)
app.use(morgan('dev') as express.RequestHandler);

// Configuração do JSON parser para requisições
app.use(express.json());

// Rotas da API
app.use('/api', userRoutes); 

// Middleware de rota não encontrada
app.use(notFoundHandler);

// Middleware de tratamento de erros
app.use(errorHandler);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

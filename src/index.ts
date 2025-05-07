// No arquivo principal da aplicação (app.ts ou index.ts)
import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(express.json());

// Use o router como middleware
app.use('/api', userRoutes);  // ou simplesmente app.use(userRoutes);

// Middleware de tratamento de erros global
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
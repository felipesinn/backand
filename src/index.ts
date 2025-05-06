import express from 'express';
import usersRouter from './routes/userRoutes'; // caminho correto para o seu arquivo

const app = express();
app.use(express.json());

// ✅ Aqui o router é usado corretamente
app.use('/api', usersRouter);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

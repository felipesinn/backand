// import express from 'express';
// import dotenv from 'dotenv';
// import morgan from 'morgan';
// import usersRouter from './src/routes/userRoutes';
// import { errorHandler } from './src/middlewares/errorHandler';
// import { notFoundHandler } from './src/middlewares/notFoundHandler';

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(morgan('dev') as express.RequestHandler);
// app.use('/api', usersRouter);
// app.use(notFoundHandler);
// app.use(errorHandler);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
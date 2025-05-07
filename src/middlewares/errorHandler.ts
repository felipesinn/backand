import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { createUser, getAllUsers } from '../services/userService';

/**
 * Manipulador para criação de usuário
 */
export const createUserHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error); // Passa o erro para o middleware de tratamento de erros
  }
};

/**
 * Manipulador para listar todos os usuários
 */
export const getAllUsersHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    next(error); // Passa o erro para o middleware de tratamento de erros
  }
};

/**
 * Middleware de tratamento de erros global
 */
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('Erro:', err);
  
  // Determina o status do erro (usa 500 como padrão)
  const statusCode = err.statusCode || 500;
  
  // Estrutura da resposta de erro
  const errorResponse = {
    message: err.message || 'Erro interno do servidor',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  };
  
  res.status(statusCode).json(errorResponse);
  
  // Chama next() se necessário para outros handlers de erro
  if (next) next(err);
};
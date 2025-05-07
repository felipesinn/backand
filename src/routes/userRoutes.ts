// routes/userRoutes.ts
import { Router, Request, Response, NextFunction } from 'express';
import { createUserHandler, getAllUsersHandler, loginHandler } from '../controller/userController';

const router = Router();

// Wrapper para tratar funções async com tipagem segura
const asyncHandler = (handler: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next).catch(next); // garante que erros sejam enviados ao Express
  };

router.post('/users', asyncHandler(createUserHandler));
router.get('/users', asyncHandler(getAllUsersHandler));
router.post('/login', asyncHandler(loginHandler));

export default router;

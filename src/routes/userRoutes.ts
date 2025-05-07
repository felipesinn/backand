import { Router, Request, Response, NextFunction } from 'express';
import { createUserHandler, getAllUsersHandler } from '../controller/userController';

const router = Router();

// Wrappers que garantem a compatibilidade de tipos
const createHandler = (handler: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return (req: Request, res: Response, next: NextFunction) => handler(req, res, next);
  };

const getAllWrapper = (req: Request, res: Response, next: NextFunction) => {
  return getAllUsersHandler(req, res, next);
};

router.post('/users', createHandler(createUserHandler));
router.get('/users', createHandler(getAllUsersHandler));

export default router;


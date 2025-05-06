import { Router } from 'express';
import { createUser, getUsers } from '../controller/userController';

const usersRouter = Router();

usersRouter.post('/user', createUser);
usersRouter.get('/', getUsers);

export default usersRouter;

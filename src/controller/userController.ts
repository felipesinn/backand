// controller/userController.ts
import { Request, Response } from 'express';
import { createUser, getAllUsers } from '../services/userService';
import prisma from '../lib/prisma';
import { signToken } from '../utils/jwt';

export const createUserHandler = async (req: Request, res: Response) => {
  const user = await createUser(req.body);
  res.status(201).json({ message: 'User created successfully', user });
};

export const getAllUsersHandler = async (_req: Request, res: Response) => {
  const users = await getAllUsers();
  res.status(200).json(users);
};

export const loginHandler = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.password !== password) {
    res.status(401).json({ error: 'Credenciais inválidas' });
    return;
  }

  const token = signToken({
    id: user.id,
    email: user.email,
    isMaster: user.isMaster,
    permissions: user.permissions
  });

  res.status(200).json({ token });
};

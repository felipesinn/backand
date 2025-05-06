import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({ data: { name, email } });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar usuário.' });
  }
};

export const getUsers = async (_: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

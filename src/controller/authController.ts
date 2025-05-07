import { Request, Response } from 'express';
import prisma from '../lib/prisma'; // ajuste conforme seu projeto

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, isMaster, permissions } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        isMaster,
        permissions,
      },
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};


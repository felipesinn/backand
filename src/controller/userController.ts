import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Definindo o esquema de validação com Zod
const createUserSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório." }),
  email: z.string().email({ message: "O e-mail deve ser válido." }).min(1, { message: "O e-mail é obrigatório." }),
});

// Função para criar um usuário
export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Validação dos dados da requisição
    const validatedData = createUserSchema.parse(req.body);  // `parse` valida os dados

    const { name, email } = validatedData;

    const user = await prisma.user.create({
      data: { name, email }
    });

    return res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Se houver erro de validação do Zod, retorne um erro 400 com a mensagem
      return res.status(400).json({
        error: "Dados inválidos",
        details: error.errors,  // Detalhes do erro de validação
      });
    }

    // Caso ocorra algum outro erro
    return res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
};

// Função para obter todos os usuários
export const getUsers = async (_: Request, res: Response): Promise<Response> => {
  try {
    const users = await prisma.user.findMany();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};

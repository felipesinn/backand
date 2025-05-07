import prisma from '../prisma/client';
import { createUserSchema } from '../utils/validationSchemas';


export const createUser = async (data: { name: string; email: string; }) => {
  const validatedData = createUserSchema.parse(data);
  return await prisma.user.create({ data: validatedData });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

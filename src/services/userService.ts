import prisma from '../lib/prisma'; // Adjust the import path as necessary
import { createUserSchema } from '../utils/validationSchemas';


export const createUser = async (data: { name: string; email: string; }) => {
  const validatedData = createUserSchema.parse(data);
  return await prisma.user.create({ data: { ...validatedData, password: 'defaultPassword123' } });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

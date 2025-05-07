import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório." }),
  email: z.string().email({ message: "O e-mail deve ser válido." }).min(1, { message: "O e-mail é obrigatório." }),
});

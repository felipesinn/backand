import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { signToken } from '../utils/jwt';
import { authenticate, authorize } from '../middlewares/auth';

const router = Router();

router.post('/login', async (req: Request, res: Response): Promise<void> => {
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

  res.status(200 as number).json({ token });
});

// Somente usuários com permissão view:suporte ou isMaster
router.get('/suporte/conteudo', authenticate, authorize('view:suporte'), (req, res) => {
  res.json({ conteudo: 'Apenas quem pode ver suporte vê isso' });
});

// Admin de suporte
router.post('/suporte/conteudo', authenticate, authorize('edit:suporte'), (req, res) => {
  res.json({ status: 'Conteúdo de suporte adicionado' });
});

// Master: vê todos os usuários
router.get('/admin/usuarios', authenticate, async (req, res): Promise<void> => {
  const user = req.user as any;
  if (!user.isMaster) {
    res.status(403).json({ error: 'Acesso restrito ao Master' });
    return;
  }

  const users = await prisma.user.findMany();
  res.json({ users });
});

export default router;

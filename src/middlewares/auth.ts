import e, { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';


// Extend the Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}


export function authenticate(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;
  
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Token ausente ou malformado' });
      return;
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = verifyToken(token) as any;
      req.user = decoded; // adiciona os dados do usuário à requisição
      next();
    } catch (error) {
      res.status(401).json({ error: 'Token inválido ou expirado' });
    }
  }

  export function authorize(requiredPermission: string) {
    return (req: Request, res: Response, next: NextFunction): void => {
      const user = req.user;
  
      if (!user) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }
  
      if (user.isMaster || (user.permissions && user.permissions.includes(requiredPermission))) {
        next(); // autorizado
      } else {
        res.status(403).json({ error: 'Permissão negada' });
      }
    };
  }
  

  
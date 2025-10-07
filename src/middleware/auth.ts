import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/authService';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyToken(token);
    // Armazena informações do usuário no objeto de requisição
    req.body.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};

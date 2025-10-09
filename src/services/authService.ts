import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
/*
export const tokenLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // máximo 10 requisições por IP
  message: { error: 'Muitas tentativas. Tente novamente mais tarde.' },
  standardHeaders: true,
  legacyHeaders: false,
});
*/
export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};

import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || '';
const CLIENT_USER = process.env.CLIENT_USER || '';
const CLIENT_PASS = process.env.CLIENT_PASS || '';

// 🔐 Esta rota só é acessível pelo front-end da aplicação (sem senha no body)
router.get('/client', (req, res) => {
  try {
//    if (req.headers.origin !== 'https://meuapp.vercel.app') {
//        return res.status(403).json({ message: 'Acesso não autorizado' });
//    }

    // O backend autentica internamente o "usuário do sistema"
    const token = jwt.sign(
      { id: CLIENT_USER, role: 'system' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ token });
  } catch (error) {
    console.error('Erro ao gerar token:', error);
    res.status(500).json({ message: 'Erro interno ao gerar token' });
  }
});

export default router;

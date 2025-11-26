import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import pessoasRoute from './routes/pessoas.router';
import taxasRoute from './routes/taxas.router';
import dojosRoute from './routes/dojosRouter';
import graduacoesRoute from './routes/graduacoesRouter';
import cobrancasRoute from './routes/cobrancasRouter';
import usuarioRoute from './routes/usuario.router'
import { generateToken } from './services/auth.service';
import dotenv from 'dotenv'

dotenv.config();

const VALID_CREDENTIALS = {
  username: process.env.ADMIN_USER || 'admin',
  password: process.env.ADMIN_SENHA || 'senha123',
};

function basicAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Autenticação necessária' });
  }
  
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  
  if (username !== VALID_CREDENTIALS.username || password !== VALID_CREDENTIALS.password) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
  
  next();
}

const app = express();

app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname, 'public')));

//app.use('/api/', authenticate, pessoas);

// Rota de login (sem segurança, apenas para gerar o token)
app.post('/gera-token', basicAuth, (req, res) => {
  // Exemplo: gerar um token para um usuário fictício
  const token = generateToken('user123');
  res.json({ token });
});

// Rotas protegidas
//app.use('/api/auth', authRoutes);
app.use('/api/login', usuarioRoute);
app.use('/api/pessoas', pessoasRoute);
app.use('/api/taxas', taxasRoute);
app.use('/api/dojos', dojosRoute);
app.use('/api/cobrancas', cobrancasRoute);
app.use('/api/graduacoes', graduacoesRoute);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(error.message);
})

export default app;

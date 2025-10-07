import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import pessoasRoute from './routes/pessoasRouter';
import { generateToken } from './services/authService';

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
app.post('/login', (req, res) => {
  // Exemplo: gerar um token para um usuário fictício
  const token = generateToken('user123');
  res.json({ token });
});

// Rotas protegidas
app.use('/api', pessoasRoute);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(error.message);
})

export default app;

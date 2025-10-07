// middleware/apiAuth.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export function requireApiAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  // 🔹 Primeiro tenta Authorization Header
  const authHeader = req.headers["authorization"];
  let token: string | undefined;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // 🔹 Se não veio no header, tenta cookie
  if (!token && req.cookies?.authToken) {
    token = req.cookies.authToken;
  }

  if (!token) {
    return res.status(401).json({ error: "Token de autenticação necessário" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}

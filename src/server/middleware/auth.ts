import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from 'jose';
import env from '../config/env';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(env.JWT_SECRET)
    );

    req.user = {
      id: payload.sub as string,
      email: payload.email as string,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
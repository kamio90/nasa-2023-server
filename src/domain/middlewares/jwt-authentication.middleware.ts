/* eslint-disable @typescript-eslint/no-namespace */
import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers.authorization;

  if (token == null) {
    res.status(401).json({ message: 'Unauthorized: Token is missing' });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY ?? 'your-secret-key'
    );

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}

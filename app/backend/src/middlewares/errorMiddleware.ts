import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import ICustomError from '../Interfaces/ICustomError';

const jwtSecret = process.env.JWT_SECRET || 'jwt_secret';

const bearerToken = (token: string) => token.split(' ')[1];

function errorMiddleware(error: ICustomError, _req: Request, res: Response, _next: NextFunction) {
  const status = error.statusCode || 500;
  const message = error.message || 'Something went wrong';
  console.log(error);
  return res.status(status).json({ message });
}

function verifyTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not found' });
    const createBearer = bearerToken(token);
    const decoded = jwt.verify(createBearer, jwtSecret);
    req.body.decoded = decoded;
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  next();
}

export { errorMiddleware, verifyTokenMiddleware };

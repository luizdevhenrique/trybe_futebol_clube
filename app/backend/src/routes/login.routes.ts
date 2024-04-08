import { Request, Response, Router } from 'express';
import LoginsController from '../controllers/Login.controller';
import { verifyTokenMiddleware } from '../middlewares/errorMiddleware';

const loginsController = new LoginsController();

const loginRoutes = Router();

loginRoutes.post('/', (req: Request, res: Response) => loginsController.login(req, res));
loginRoutes.get(
  '/role',
  verifyTokenMiddleware,
  (req: Request, res: Response) => loginsController.getRole(req, res),
);

export default loginRoutes;

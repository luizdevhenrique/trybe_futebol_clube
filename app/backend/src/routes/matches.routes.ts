import { Request, Response, Router } from 'express';
import { verifyTokenMiddleware } from '../middlewares/errorMiddleware';
import MatchesController from '../controllers/Matches.controller';

const matchesController = new MatchesController();

const matchesRoutes = Router();

matchesRoutes.get(
  '/',
  (req: Request, res: Response) => matchesController.getMatches(req, res),
);

matchesRoutes.patch(
  '/:id/finish',
  verifyTokenMiddleware,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);

matchesRoutes.patch(
  '/:id',
  verifyTokenMiddleware,
  (req: Request, res: Response) => matchesController.updateGoals(req, res),
);

matchesRoutes.post(
  '/',
  verifyTokenMiddleware,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default matchesRoutes;

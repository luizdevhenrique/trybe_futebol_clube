import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const leaderboardController = new LeaderboardController();
const leaderboardRoutes = Router();

leaderboardRoutes
  .get('/home', (req: Request, res: Response) => leaderboardController.getLeaderboard(req, res));

leaderboardRoutes
  .get('/away', (req: Request, res: Response) => leaderboardController
    .getAwayLeaderboard(req, res));

export default leaderboardRoutes;

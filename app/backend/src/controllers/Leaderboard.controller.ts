import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService = new LeaderboardService()) { }

  public async getLeaderboard(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderboardService.getLeaderboard();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getAwayLeaderboard(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderboardService.getAwayLeaderboard();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}

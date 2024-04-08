import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  constructor(private matchesService: MatchesService = new MatchesService()) { }

  public async getMatches(req: Request, res: Response): Promise<Response> {
    const query = req.query.inProgress as string;
    if (query) {
      return this.filterMatches(req, res);
    }
    const { status, data } = await this.matchesService.getMatches();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async filterMatches(req: Request, res: Response): Promise<Response> {
    const query = req.query.inProgress as string;
    const { status, data } = await this.matchesService.filterMatches(query);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateMatch(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const serviceResponse = await this.matchesService.updateMatch(id);

    if (serviceResponse.status === 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async updateGoals(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const serviceResponse = await this.matchesService.updateGoals(id, homeTeamGoals, awayTeamGoals);

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async createMatch(req: Request, res: Response): Promise<Response> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const serviceResponse = await this.matchesService
      .createMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}

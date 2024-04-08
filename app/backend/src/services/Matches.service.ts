import { ServiceMessage, ServiceResponse, SucessfullyCreated } from '../Interfaces/ServiceResponse';
import MatchesModel from '../database/models/MatchesModel';
import { IMatches } from '../Interfaces/Matches/IMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import Teams from '../database/models/Teams/TeamsSequelize.models';

const err = { message: 'It is not possible to create a match with two equal teams' };
export default class MatchesService {
  constructor(
    private teamsModel: IMatchesModel = new MatchesModel(),
  ) { }

  public async getMatches(): Promise<ServiceResponse<IMatches[]>> {
    const matches: IMatches[] = await this.teamsModel.getMatches();
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async filterMatches(query: string): Promise<ServiceResponse<IMatches[]>> {
    const matches: IMatches[] = await this.teamsModel.filterMatches(query);
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async updateMatch(id: number):
  Promise<ServiceResponse<ServiceMessage>> {
    await this.teamsModel.updateMatch(id);

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateGoals(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<ServiceMessage>> {
    await this.teamsModel.updateGoals(id, homeTeamGoals, awayTeamGoals);

    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<ServiceMessage> | SucessfullyCreated > {
    if (homeTeamId === awayTeamId) return { status: 'UNPROCESSABLE_ENTITY', data: err };
    const hTeam = await Teams.findByPk(homeTeamId);
    const aTeam = await Teams.findByPk(awayTeamId);
    if (!hTeam || !aTeam) {
      return { status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' } };
    }
    const id = await this.teamsModel
      .createMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    const rsp = { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress: true };
    return { status: 'CREATED', data: rsp };
  }
}

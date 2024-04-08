import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamsModel from '../database/models/Teams/Teams.model';
import { ITeams } from '../Interfaces/Teams/ITeams';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) { }

  public async getTeams(): Promise<ServiceResponse<ITeams[]>> {
    const teams: ITeams[] = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: teams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeams>> {
    const team = await this.teamsModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found!` } };
    return { status: 'SUCCESSFUL', data: team };
  }
}

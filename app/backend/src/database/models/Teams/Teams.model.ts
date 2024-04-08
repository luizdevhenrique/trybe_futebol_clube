import { ITeams } from '../../../Interfaces/Teams/ITeams';
import { ITeamsModel } from '../../../Interfaces/Teams/ITeamsModel';
import TeamsSequelize from './TeamsSequelize.models';

export default class TeamsModel implements ITeamsModel {
  private model = TeamsSequelize;

  async findAll(): Promise<ITeams[]> {
    const teams = await this.model.findAll();
    return teams.map(({ id, teamName }) => ({
      id,
      teamName,
    }));
  }

  async findById(id: ITeams['id']): Promise<ITeams | null> {
    const teams = await this.model.findByPk(id);
    if (!teams) return null;
    const { id: teamId, teamName }: ITeams = teams;
    return { id: teamId, teamName };
  }
}

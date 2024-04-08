import { IMatches } from '../../Interfaces/Matches/IMatches';
import { IMatchesModel } from '../../Interfaces/Matches/IMatchesModel';
import MatchesSequelize from './MatchesSequelize.models';
import TeamsSequelize from './Teams/TeamsSequelize.models';

export default class MatchesModel implements IMatchesModel {
  private model = MatchesSequelize;

  async getMatches(): Promise<IMatches[]> {
    const matches = await this.model.findAll(
      { include: [
        { model: TeamsSequelize,
          association: 'homeTeam',
          attributes: { exclude: ['id'] } },
        { model: TeamsSequelize,
          association: 'awayTeam',
          attributes: { exclude: ['id'] } },
      ] },
    );
    return matches;
  }

  async filterMatches(query: string): Promise<IMatches[]> {
    return query === 'true'
      ? this.model.findAll({ where: { inProgress: true },
        include: [{ model: TeamsSequelize,
          association: 'homeTeam',
          attributes: { exclude: ['id'] } },
        { model: TeamsSequelize,
          association: 'awayTeam',
          attributes: { exclude: ['id'] } },
        ] })
      : this.model.findAll({ where: { inProgress: false },
        include: [
          { model: TeamsSequelize,
            association: 'homeTeam',
            attributes: { exclude: ['id'] } },
          { model: TeamsSequelize,
            association: 'awayTeam',
            attributes: { exclude: ['id'] } }],
      });
  }

  async updateMatch(id: IMatches['id']):
  Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateGoals(
    id: IMatches['id'],
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<void> {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<number> {
    const match = await this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return match.id;
  }
}

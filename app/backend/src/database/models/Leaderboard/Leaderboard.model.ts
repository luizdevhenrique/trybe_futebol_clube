import { QueryTypes } from 'sequelize';
import { homeQuery, awayQuery } from '../../../utils/query';
import { ILeaderboardModel } from '../../../Interfaces/Leaderboard/ILeaderboardModel';
import { ILeaderboard } from '../../../Interfaces/Leaderboard/ILeaderboard';
import MatchesModelSequelize from '../MatchesSequelize.models';

export default class LeaderboardModel implements ILeaderboardModel {
  private model = MatchesModelSequelize;
  public convertArray = (data: Array<any>) => data.map((team) => ({
    name: team.teamName,
    totalPoints: this.totalPoints(Number(team.wins), Number(team.draws)),
    totalGames: Number(team.matches),
    totalVictories: Number(team.wins),
    totalDraws: Number(team.draws),
    totalLosses: Number(team.loss),
    goalsFavor: Number(team.favorGoals),
    goalsOwn: Number(team.ownGoals),
  }));

  public totalPoints = (wins: number, draws: number) => Number(Math.floor(
    wins * 3 + draws,
  ));

  public async getLeaderboard(): Promise<ILeaderboard[]> {
    const home = await this.model.sequelize?.query(homeQuery, {
      type: QueryTypes.SELECT,
    }) as unknown[];
    const response = this.convertArray(home);
    return response;
  }

  public async getAwayLeaderboard(): Promise<ILeaderboard[]> {
    const away = await this.model.sequelize?.query(awayQuery, {
      type: QueryTypes.SELECT,
    }) as unknown[];
    const response = this.convertArray(away);
    return response;
  }
}

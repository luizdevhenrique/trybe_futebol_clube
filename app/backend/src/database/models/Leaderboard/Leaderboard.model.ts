import { QueryTypes } from 'sequelize';
import { homeQuery, awayQuery } from '../../../utils/query';
import { ILeaderboardModel } from '../../../Interfaces/Leaderboard/ILeaderboardModel';
import { ILeaderboard } from '../../../Interfaces/Leaderboard/ILeaderboard';
import MatchesModelSequelize from '../MatchesSequelize.models';

export default class LeaderboardModel implements ILeaderboardModel {
  private model = MatchesModelSequelize;
  public getEfficiency = (totalPoints: number, totalGames: number): number => {
    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    return Number(efficiency.toFixed(2));
  };

  public sorted = (data: Array<any>): ILeaderboard[] => {
    data.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (a.totalVictories !== b.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if (a.goalsBalance !== b.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });
    return data;
  };

  public convertArray = (data: Array<any>) => data.map((team) => ({
    name: team.teamName,
    totalPoints: this.totalPoints(Number(team.wins), Number(team.draws)),
    totalGames: Number(team.matches),
    totalVictories: Number(team.wins),
    totalDraws: Number(team.draws),
    totalLosses: Number(team.loss),
    goalsFavor: Number(team.favorGoals),
    goalsOwn: Number(team.ownGoals),
    goalsBalance: Number(team.favorGoals) - Number(team.ownGoals),
    efficiency: this.getEfficiency(Number(this.totalPoints(Number(
      team.wins,
    ), Number(team.draws))), Number(team.matches)),
  }));

  public totalPoints = (wins: number, draws: number) => Number(Math.floor(
    wins * 3 + draws,
  ));

  public async getLeaderboard(): Promise<ILeaderboard[]> {
    const home = await this.model.sequelize?.query(homeQuery, {
      type: QueryTypes.SELECT,
    }) as unknown[];
    const response = this.convertArray(home);
    const sorted = this.sorted(response);
    return sorted;
  }

  public async getAwayLeaderboard(): Promise<ILeaderboard[]> {
    const away = await this.model.sequelize?.query(awayQuery, {
      type: QueryTypes.SELECT,
    }) as unknown[];
    const response = this.convertArray(away);
    const sorted = this.sorted(response);
    return sorted;
  }
}

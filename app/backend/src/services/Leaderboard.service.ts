import LeaderboardModel from '../database/models/Leaderboard/Leaderboard.model';
import { ILeaderboardModel } from '../Interfaces/Leaderboard/ILeaderboardModel';

export default class LeaderboardService {
  constructor(
    private leaderboardModel: ILeaderboardModel = new LeaderboardModel(),
  ) { }

  public async getLeaderboard() {
    const response = await this.leaderboardModel.getLeaderboard();
    return { status: 'SUCCESSFUL', data: response };
  }

  public async getAwayLeaderboard() {
    const response = await this.leaderboardModel.getAwayLeaderboard();
    return { status: 'SUCCESSFUL', data: response };
  }
}

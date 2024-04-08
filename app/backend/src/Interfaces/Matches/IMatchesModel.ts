import { IMatches } from './IMatches';

export interface IMatchesModel {
  getMatches(): Promise<IMatches[]>;
  filterMatches(query: string): Promise<IMatches[]>;
  updateMatch(id: IMatches['id']): Promise<void>;
  updateGoals(id: IMatches['id'], homeTeamGoals: number, awayTeamGoals: number): Promise<void>;
  createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number): Promise<number>;
}

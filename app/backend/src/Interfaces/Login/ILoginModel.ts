// import { ILogin } from './ILogin';
import { Token } from '../../utils/types/token';
import { ILogin } from './ILogin';

export interface ILoginModel {
  login: (email: string, password: string) => Promise<Token | null>;

  findUser: (email: string) => Promise<ILogin | null>;
}

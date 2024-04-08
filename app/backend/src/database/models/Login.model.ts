import Verify from '../../utils/generateToken';
import { Token } from '../../utils/types/token';
import { ILoginModel } from '../../Interfaces/Login/ILoginModel';
import UsersSequelize from './UsersSequelize.models';
import { ILogin } from '../../Interfaces/Login/ILogin';

export default class LoginModel implements ILoginModel {
  private model = UsersSequelize;

  public async findUser(email: string): Promise<ILogin | null> {
    return this.model.findOne({ where: { email } });
  }

  public async login(
    email: string,
    password: string,
  ): Promise< Token | null> {
    const user = await this.findUser(email);
    if (!user) return null;
    const verifyPassword = await Verify.verifyPassword(password, user.password);
    if (!verifyPassword) return null;
    const token = await Verify.generateToken(user.id);
    return { token };
  }

  public async findRole(id: number): Promise<string | null> {
    const user = await this.model.findOne({ where: { id } });
    return user?.role || null;
  }
}

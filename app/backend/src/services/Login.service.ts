import { ServiceResponse } from '../Interfaces/ServiceResponse';
import LoginModel from '../database/models/Login.model';
// import { ILoginModel } from '../Interfaces/ILoginModel';
// import { ILogin } from '../Interfaces/ILogin';
import { Token } from '../utils/types/token';
import Verify from '../utils/generateToken';

const unauthorized = { message: 'Invalid email or password' };
export default class LoginService {
  constructor(private loginModel = new LoginModel()) { }

  public async login(email: string, password: string): Promise<ServiceResponse<Token>> {
    if (!email || !password) {
      return {
        status: 'BAD_REQUEST',
        data: { message: 'All fields must be filled' } };
    }

    const user = await this.loginModel.findUser(email);
    if (!user) return { status: 'UNAUTHORIZED', data: unauthorized };

    const validEmail = await Verify.validEmail(email);
    const validPassword = await Verify.validPassword(password);

    if (!validEmail || !validPassword) {
      return { status: 'UNAUTHORIZED', data: unauthorized };
    }

    const findPassword = await Verify.verifyPassword(password, user.password);
    if (!findPassword) {
      return { status: 'UNAUTHORIZED', data: unauthorized };
    }

    const token = await Verify.generateToken(user.id);
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getRole(id:number): Promise<ServiceResponse<object>> {
    const role = await this.loginModel.findRole(id);
    return { status: 'SUCCESSFUL', data: { role } };
  }
}

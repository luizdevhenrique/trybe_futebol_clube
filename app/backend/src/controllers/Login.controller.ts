import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LoginService from '../services/Login.service';

export default class LoginController {
  constructor(private loginService: LoginService = new LoginService()) { }

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const { status, data } = await this.loginService.login(email, password);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getRole(req: Request, res: Response): Promise<Response> {
    const { id } = req.body.decoded;
    const { status, data } = await this.loginService.getRole(id);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}

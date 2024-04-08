import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

export default class Verify {
  public static async generateToken(id: number): Promise<string> {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    });
  }

  public static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  public static async validPassword(password:string): Promise<boolean> {
    const verifyPassword = password.length > 6;
    return verifyPassword;
  }

  public static async validEmail(email:string): Promise<boolean> {
    const regex = /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email);
    return regex;
  }
}

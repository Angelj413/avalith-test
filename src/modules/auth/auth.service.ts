import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  /**
   * Validate user for sign in by username and password and return a token with user data
   * @param username : string
   * @param pwd : string
   * @returns {Promise<{ token: string; } & User>}
   */
  async signIn(username: string, pwd: string) {
    const userData = await this.usersService.findByUsername(username);
    if (!userData || !(await compare(pwd, userData.password))) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = userData;
    const payload = { sub: user.id, username: user.username };
    return {
      token: await this.jwtService.signAsync(payload),
      ...user,
    };
  }
}

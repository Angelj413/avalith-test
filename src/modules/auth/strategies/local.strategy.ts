import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '@modules/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordFiled: 'password',
    });
  }

  async validate(username: string, password: string) {
    const user = await this.authService.signIn(username, password);
    if (!user) {
      throw new UnauthorizedException('Not Allow.');
    }
    return user;
  }
}

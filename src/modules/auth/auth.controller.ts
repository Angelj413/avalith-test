import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsPublic } from '../../decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @IsPublic()
  @UseGuards(AuthGuard('local'))
  @Post('signin')
  signIn(@Req() request) {
    return request.user;
  }
}

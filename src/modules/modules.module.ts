import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [UsersModule, AuthModule, AdminsModule],
  providers: [],
  exports: [AuthModule],
})
export class ModulesModule {}

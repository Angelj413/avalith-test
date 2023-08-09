import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../../src/modules/auth/auth.service';
import { UsersService } from '../../../src/modules/users/users.service';
import { User } from '../../../src/modules/users/user.entity';
import { TestingModule, Test } from '@nestjs/testing';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    usersService = {
      findByUsername: jest.fn((username: string) => {
        return {
          id: 1,
          username: username,
          password:
            '$2b$10$xdn5pFZ1KrN5Tq4sdoXPvO3F28br.kmk1v6p1oi7O5OZ98P6spcrS',
        } as User;
      }),
    } as any;

    jwtService = {
      signAsync: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: jwtService },
        { provide: UsersService, useValue: usersService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('signIn', () => {
    const username = 'testUser';
    const password = 'testPassword';
    const hashedPassword =
      '$2b$10$xdn5pFZ1KrN5Tq4sdoXPvO3F28br.kmk1v6p1oi7O5OZ98P6spcrS';
    const user = {
      id: 1,
      username: username,
      password: hashedPassword,
      // ... other fields if they exist
    } as User;
    const token = 'jwtToken';

    it('should return a token and user data if credentials are valid', async () => {
      // Mocking bcrypt's compare function to return true (passwords match)
      jest.mock('bcrypt', () => ({
        compare: jest.fn().mockResolvedValue(true),
      }));

      jwtService.signAsync.mockResolvedValueOnce(token);

      const result = await authService.signIn(username, password);
      expect(result).toEqual({
        token,
        id: user.id,
        username: user.username,
      });
    });

    it('should throw an UnauthorizedException if password is incorrect', async () => {
      usersService.findByUsername.mockResolvedValueOnce(user);

      // Mocking bcrypt's compare function to return false (passwords don't match)
      jest.mock('bcrypt', () => ({
        compare: jest.fn().mockResolvedValue(false),
      }));

      await expect(
        authService.signIn(username, 'wrongPassword'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw an UnauthorizedException if user does not exist', async () => {
      usersService.findByUsername.mockResolvedValueOnce(null);

      await expect(authService.signIn(username, password)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});

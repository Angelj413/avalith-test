import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from '../../../../src/modules/auth/jwt/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let reflector: Reflector;
  let context: ExecutionContext;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new JwtAuthGuard(reflector);

    // Mocking context (simplified for this example)
    context = {
      switchToHttp: () => ({
        getRequest: jest.fn(),
      }),
      getHandler: jest.fn(),
    } as any;
  });

  describe('canActivate', () => {
    it('should allow access if route is public', async () => {
      jest.spyOn(reflector, 'get').mockReturnValue(true);

      expect(await guard.canActivate(context)).toBe(true);
    });

    it('should delegate to AuthGuard if route is not public', async () => {
      jest.spyOn(reflector, 'get').mockReturnValue(false);
      const authGuardCanActivate = jest
        .spyOn(AuthGuard('jwt').prototype, 'canActivate')
        .mockReturnValue(true);

      expect(await guard.canActivate(context)).toBe(true);
      expect(authGuardCanActivate).toHaveBeenCalled();
    });

    it('should handle potential errors gracefully', async () => {
      jest.spyOn(reflector, 'get').mockImplementation(() => {
        throw new Error('Test error');
      });

      expect(() => guard.canActivate(context)).not.toThrow();
    });
  });
});

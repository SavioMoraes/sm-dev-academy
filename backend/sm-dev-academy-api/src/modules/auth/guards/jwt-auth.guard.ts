import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_CONFIG } from '../config/jwt.config';

@Injectable()
export class JwtAuthGuard
  implements CanActivate {

  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request =
      context
        .switchToHttp()
        .getRequest();

    const authHeader =
      request.headers.authorization;

    if (!authHeader) {

      throw new UnauthorizedException(
        'Token não informado.',
      );

    }

    const [type, token] =
      authHeader.split(' ');

    if (
      type !== 'Bearer' ||
      !token
    ) {

      throw new UnauthorizedException(
        'Token inválido.',
      );

    }

    try {

      const payload =
        await this.jwtService.verifyAsync(
          token,
          {
            secret:
              JWT_CONFIG.secret,
          },
        );

      request.user =
        payload;

      return true;

    } catch {

      throw new UnauthorizedException(
        'Token inválido.',
      );

    }

  }

}
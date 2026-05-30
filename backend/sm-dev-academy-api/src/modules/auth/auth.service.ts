import { BadRequestException, UnauthorizedException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ) {

    const existingUser =
      await this.userService.findByEmail(
        registerDto.email,
      );

    if (existingUser) {

      throw new BadRequestException(
        'E-mail já cadastrado.',
      );

    }

    const hashedPassword =
      await bcrypt.hash(
        registerDto.password,
        10,
      );

    const user =
      await this.userService.create({
        name: registerDto.name,
        email: registerDto.email,
        password: hashedPassword,
      });

    return {
      message: 'Usuário cadastrado com sucesso.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async login(
    loginDto: LoginDto,
  ) {

    const user =
      await this.userService.findByEmail(
        loginDto.email,
      );

    if (!user) {

      throw new UnauthorizedException(
        'E-mail ou senha inválidos.',
      );

    }

    const passwordMatch =
      await bcrypt.compare(
        loginDto.password,
        user.password,
      );

    if (!passwordMatch) {

      throw new UnauthorizedException(
        'E-mail ou senha inválidos.',
      );

    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken =
      await this.jwtService.signAsync(
        payload,
      );

    return {
      message: 'Login realizado com sucesso.',
      access_token: accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };

  }

}
import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Patch,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint para cadastro de usuário
  @Post('register')
  async register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  // Endpoint para login de usuário
  @Post('login')
  async login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  // Endpoint protegido para verificar o token
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('profile')
  getProfile() {
    return {
      message: 'Token válido.',
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(
    @Req()
    request: any,

    @Body()
    updateProfileDto: UpdateProfileDto,
  ) {
    return this.authService.updateProfile(request.user.sub, updateProfileDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePassword(
    @Req()
    request: any,

    @Body()
    changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(request.user.sub, changePasswordDto);
  }
}

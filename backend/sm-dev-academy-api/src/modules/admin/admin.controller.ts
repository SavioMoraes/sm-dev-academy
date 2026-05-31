import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';

import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('admin')
export class AdminController {

  @ApiBearerAuth()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('ADMIN')
  @Get('me')
  getMe(
    @Req() request: any,
  ) {

    return {
      id: request.user.sub,
      email: request.user.email,
      role: request.user.role,
    };

  }

}
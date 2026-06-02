import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';

import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AdminService } from './admin.service';



@Controller('admin')
export class AdminController {

  constructor(
    private readonly adminService: AdminService,
  ) {}

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

  @ApiBearerAuth()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('ADMIN')
  @Post('courses/import')
  importCourses() {

    return this.adminService.importCourses();

  }

}
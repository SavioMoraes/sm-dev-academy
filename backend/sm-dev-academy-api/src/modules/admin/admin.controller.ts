import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AdminService } from './admin.service';
import { ImportCoursesDto } from './dto/import-courses.dto';
import { DeleteCoursesDto } from './dto/delete-courses.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('me')
  getMe(@Req() request: any) {
    return {
      id: request.user.sub,
      email: request.user.email,
      role: request.user.role,
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('dashboard')
  getDashboard() {
    return this.adminService.getDashboard();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('users')
  getUsers() {
    return this.adminService.getUsers();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('users/search')
  searchUsers(@Query('term') term: string) {
    return this.adminService.searchUsers(term);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch('users/:id/promote')
  promoteUser(@Param('id') id: string) {
    return this.adminService.promoteUser(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch('users/:id/demote')
  demoteUser(@Param('id') id: string) {
    return this.adminService.demoteUser(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch('users/:id/reset-password')
  resetPassword(
    @Param('id') id: string,
    @Body()
    body: {
      password: string;
    },
  ) {
    return this.adminService.resetPassword(id, body.password);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete('courses/playlist/:playlistId')
  deleteCourse(@Param('playlistId') playlistId: string) {
    return this.adminService.deleteCourseByPlaylistId(playlistId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete('courses')
  deleteCourses(
    @Body()
    body: DeleteCoursesDto,
  ) {
    return this.adminService.deleteCourses(body.playlistIds);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('courses/import')
  importCourses(
    @Body()
    body: ImportCoursesDto,
  ) {
    return this.adminService.importCourses(body.technologies);
  }
}

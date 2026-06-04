import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FavoriteService } from './favorite.service';

@Controller('learn/favorites')
export class FavoriteController {

  constructor(
    private readonly favoriteService: FavoriteService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':courseId')
  async create(
    @Req()
    request: any,

    @Param('courseId')
    courseId: string,
  ) {

    return this.favoriteService.create(
      request.user.sub,
      courseId,
    );

  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':courseId')
  async remove(
    @Req()
    request: any,

    @Param('courseId')
    courseId: string,
  ) {

    return this.favoriteService.remove(
      request.user.sub,
      courseId,
    );

  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getFavorites(
    @Req()
    request: any,
  ) {

    return this.favoriteService.getFavorites(
      request.user.sub,
    );

  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('check/:courseId')
  async isFavorite(
    @Req()
    request: any,

    @Param('courseId')
    courseId: string,
  ) {

    return this.favoriteService.isFavorite(
      request.user.sub,
      courseId,
    );

  }

}
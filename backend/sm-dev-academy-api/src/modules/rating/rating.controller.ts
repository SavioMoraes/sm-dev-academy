import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CreateRatingDto } from './dto/create-rating.dto';
import { RatingService } from './rating.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post(':courseId')
  async create(
    @Req()
    request: any,

    @Param('courseId')
    courseId: string,

    @Body()
    createRatingDto: CreateRatingDto,
  ) {
    return this.ratingService.create(
      request.user.sub,
      courseId,
      createRatingDto,
    );
  }

  @Get(':courseId')
  async getRating(
    @Req()
    request: any,

    @Param('courseId')
    courseId: string,
  ) {
    return this.ratingService.getRating(request.user.sub, courseId);
  }
}

import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { MyCourseService } from './my-course.service';

@Controller('learn/my-courses')
export class MyCourseController {

  constructor(
    private readonly myCourseService: MyCourseService,
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

    return this.myCourseService.create(
      request.user.sub,
      courseId,
    );

  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getMyCourses(
    @Req()
    request: any,
  ) {

    return this.myCourseService.getMyCourses(
      request.user.sub,
    );

  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('check/:courseId')
  async isStarted(
    @Req()
    request: any,

    @Param('courseId')
    courseId: string,
  ) {

    return this.myCourseService.isStarted(
      request.user.sub,
      courseId,
    );

  }

}
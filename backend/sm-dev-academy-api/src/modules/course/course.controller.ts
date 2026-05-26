import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
export class CourseController {

  constructor(
    private readonly courseService: CourseService,
  ) {}

  @Post()
  async create(
    @Body() createCourseDto: CreateCourseDto,
  ) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  async findAll() {
    return this.courseService.findAll();
  }

}
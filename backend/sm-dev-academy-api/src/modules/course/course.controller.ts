import {
  Controller,
  Get,
} from '@nestjs/common';

import { CourseService } from './course.service';

@Controller('learn/courses')
export class CourseController {

  constructor(
    private readonly courseService: CourseService,
  ) {}

  @Get()
  async getCourses() {

    return this.courseService.getCourses();

  }

}
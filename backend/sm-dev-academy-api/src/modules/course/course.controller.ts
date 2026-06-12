import { Controller, Get, Param } from '@nestjs/common';
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

  @Get('id/:id')
  async getCourseById(
    @Param('id')
    id: string,
  ) {
    return this.courseService.getCourseById(
      id,
    );

  }

  @Get(':playlistId')
  async getCourseByPlaylistId(
    @Param('playlistId')
    playlistId: string,
  ) {
    return this.courseService.getCourseByPlaylistId(
      playlistId,
    );
  }

}
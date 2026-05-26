import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseService } from './course.service';

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

  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
  })

  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
  })

  @ApiQuery({
    name: 'search',
    required: false,
    example: 'angular',
  })

  @ApiQuery({
    name: 'category',
    required: false,
    example: 'Frontend',
  })

  @Get()
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search?: string,
    @Query('category') category?: string,
  ) {

    return this.courseService.findAll(
      Number(page),
      Number(limit),
      search,
      category,
    );

  }

}
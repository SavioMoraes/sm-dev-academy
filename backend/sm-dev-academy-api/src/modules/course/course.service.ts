import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {

  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async create(
    createCourseDto: CreateCourseDto,
  ) {
    return this.prismaService.course.create({
      data: createCourseDto,
    });
  }

  async findAll() {
    return this.prismaService.course.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

}
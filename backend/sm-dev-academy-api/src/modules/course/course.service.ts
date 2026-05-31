import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class CourseService {

  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async getCourses() {

    const courses =
      await this.prismaService.course.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });

    return {

      total:
        courses.length,

      courses,

    };

  }

}
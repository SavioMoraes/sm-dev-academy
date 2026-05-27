import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {

  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async create(createCourseDto: CreateCourseDto) {

    return this.prismaService.course.create({
      data: createCourseDto,
    });

  }

  async findAll(
    page: number,
    limit: number,
    search?: string,
    category?: string,
  ) {

    const skip = (page - 1) * limit;

    const where = {
      AND: [
        search
          ? {
              OR: [
                {
                  title: {
                    contains: search,
                    mode: 'insensitive' as const,
                  },
                },
                {
                  description: {
                    contains: search,
                    mode: 'insensitive' as const,
                  },
                },
              ],
            }
          : {},

        category
          ? {
              category,
            }
          : {},
      ],
    };

    const total = await this.prismaService.course.count({
      where,
    });

    const courses = await this.prismaService.course.findMany({
      skip,
      take: limit,
      where,

      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: courses,

      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };

  }

}
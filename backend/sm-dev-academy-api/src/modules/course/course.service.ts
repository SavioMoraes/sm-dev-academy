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

    return this.prismaService.course.findMany({
      skip,
      take: limit,

      where: {
        AND: [
          search
            ? {
                OR: [
                  {
                    title: {
                      contains: search,
                      mode: 'insensitive',
                    },
                  },
                  {
                    description: {
                      contains: search,
                      mode: 'insensitive',
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
      },

      orderBy: {
        createdAt: 'desc',
      },
    });

  }

}
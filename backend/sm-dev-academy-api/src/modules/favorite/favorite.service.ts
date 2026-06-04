import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class FavoriteService {

  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async create(
    userId: string,
    courseId: string,
  ) {

    const course =
      await this.prismaService.course.findUnique({
        where: {
          id: courseId,
        },
      });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return this.prismaService.favorite.upsert({

      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },

      update: {},

      create: {
        userId,
        courseId,
      },

    });

  }

  async remove(
    userId: string,
    courseId: string,
  ) {

    return this.prismaService.favorite.deleteMany({

      where: {
        userId,
        courseId,
      },

    });

  }

  async getFavorites(
    userId: string,
  ) {

    return this.prismaService.favorite.findMany({

      where: {
        userId,
      },

      include: {

        course: true,

      },

      orderBy: {
        createdAt: 'desc',
      },

    });

  }

}
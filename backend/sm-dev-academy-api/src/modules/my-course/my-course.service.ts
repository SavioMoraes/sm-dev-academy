import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class MyCourseService {

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

      throw new NotFoundException(
        'Course not found',
      );

    }

    return this.prismaService.userCourse.upsert({

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

 async getMyCourses(
    userId: string,
  ) {

    return this.prismaService.userCourse.findMany({

      where: {
        userId,
      },

      include: {

        course: {

          select: {

            id: true,
            title: true,
            thumbnail: true,
            playlistId: true,
            category: true,

          },

        },

      },

      orderBy: {

        startedAt: 'desc',

      },

    });

  }

  async isStarted(
    userId: string,
    courseId: string,
  ) {

    const userCourse =
      await this.prismaService.userCourse.findFirst({

        where: {
          userId,
          courseId,
        },

      });

    return {

      isStarted:
        !!userCourse,

    };

  }

  async updateProgress(
    userId: string,
    courseId: string,
    lastVideoId: string,
    progress: number,
  ) {
    return this.prismaService.userCourse.update({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      data: {
        lastVideoId,
        progress,
      },
    });
  }

}
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class CourseService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async getCourses() {
    const courses = await this.prismaService.course.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      total: courses.length,
      courses,
    };
  }

  async getCourseById(id: string) {
    const course = await this.prismaService.course.findUnique({
      where: {
        id,
      },

      include: {
        videos: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async getCourseByPlaylistId(playlistId: string) {
    const course = await this.prismaService.course.findUnique({
      where: {
        playlistId,
      },

      include: {
        videos: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

}
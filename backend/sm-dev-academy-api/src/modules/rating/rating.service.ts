import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';

import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class RatingService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    userId: string,
    courseId: string,
    createRatingDto: CreateRatingDto,
  ) {
    const course = await this.prismaService.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    await this.prismaService.courseRating.upsert({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },

      update: {
        rating: createRatingDto.rating,
      },

      create: {
        userId,
        courseId,
        rating: createRatingDto.rating,
      },
    });

    return this.getRating(userId, courseId);
  }

  async getRating(userId: string, courseId: string) {
    const course = await this.prismaService.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const aggregate = await this.prismaService.courseRating.aggregate({
      where: {
        courseId,
      },

      _avg: {
        rating: true,
      },

      _count: {
        rating: true,
      },
    });

    const userRating = await this.prismaService.courseRating.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    return {
      average: aggregate._avg.rating
        ? Number(aggregate._avg.rating.toFixed(1))
        : 0,

      totalRatings: aggregate._count.rating,

      userRating: userRating?.rating ?? null,
    };
  }

  async getRatings(userId: string, courseIds: string[]) {
    const [aggregates, userRatings] = await Promise.all([
      this.prismaService.courseRating.groupBy({
        by: ['courseId'],

        where: {
          courseId: {
            in: courseIds,
          },
        },

        _avg: {
          rating: true,
        },

        _count: {
          rating: true,
        },
      }),

      this.prismaService.courseRating.findMany({
        where: {
          userId,

          courseId: {
            in: courseIds,
          },
        },

        select: {
          courseId: true,
          rating: true,
        },
      }),
    ]);

    return courseIds.map((courseId) => {
      const aggregate = aggregates.find((item) => item.courseId === courseId);

      const userRating = userRatings.find((item) => item.courseId === courseId);

      return {
        courseId,

        average: aggregate?._avg.rating
          ? Number(aggregate._avg.rating.toFixed(1))
          : 0,

        totalRatings: aggregate?._count.rating ?? 0,

        userRating: userRating?.rating ?? null,
      };
    });
  }
}

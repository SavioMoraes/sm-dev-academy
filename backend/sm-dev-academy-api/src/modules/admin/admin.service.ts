import { Injectable } from '@nestjs/common';

import { YoutubeService } from '../youtube/youtube.service';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly youtubeService: YoutubeService,
    private readonly prismaService: PrismaService,
  ) {}

  async getDashboard() {
    const [totalCourses, totalUsers, totalAdmins] = await Promise.all([
      this.prismaService.course.count(),
      this.prismaService.user.count(),
      this.prismaService.user.count({
        where: {
          role: 'ADMIN',
        },
      }),
    ]);

    return {
      totalCourses,
      totalUsers,
      totalAdmins,
    };
  }

  async getUsers() {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatarUrl: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return users;
  }

  async promoteUser(userId: string) {
    return this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        role: 'ADMIN',
      },
    });
  }

  async demoteUser(userId: string) {
    return this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        role: 'USER',
      },
    });
  }

  async deleteUser(userId: string) {
    return this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async deleteCourseByPlaylistId(playlistId: string) {
    const course = await this.prismaService.course.findUnique({
      where: {
        playlistId,
      },
    });

    if (!course) {
      throw new Error('Curso não encontrado.');
    }

    await this.prismaService.userCourse.deleteMany({
      where: {
        courseId: course.id,
      },
    });

    await this.prismaService.courseVideo.deleteMany({
      where: {
        courseId: course.id,
      },
    });

    await this.prismaService.notification.create({
      data: {
        title: `O curso ${course.title} foi removido da plataforma.`,
      },
    });

    await this.prismaService.course.delete({
      where: {
        id: course.id,
      },
    });

    return {
      success: true,
    };
  }

  async importCourses() {
    const result = await this.youtubeService.getCourses();

    let saved = 0;
    let duplicates = 0;
    let videosSaved = 0;

    for (const course of result.courses) {
      const existingCourse = await this.prismaService.course.findUnique({
        where: {
          playlistId: course.playlistId,
        },
      });

      if (existingCourse) {
        duplicates++;

        continue;
      }

      const createdCourse = await this.prismaService.course.create({
        data: {
          playlistId: course.playlistId,
          title: course.title,
          slug: course.playlistId,
          description: course.description,
          thumbnail: course.thumbnail,
          playlistUrl: course.playlistUrl,
          category: course.category,
          technology: course.technology,
          featured: false,
        },
      });

      const videos = await this.youtubeService.getPlaylistVideos(
        course.playlistId,
      );

      for (const video of videos) {
        if (!video.videoId) {
          continue;
        }

        await this.prismaService.courseVideo.upsert({
          where: {
            videoId: video.videoId,
          },

          update: {},

          create: {
            courseId: createdCourse.id,
            videoId: video.videoId,
            title: video.title,
            thumbnail: video.thumbnail,
            position: video.position,
          },
        });

        videosSaved++;
      }

      saved++;

      await this.prismaService.notification.create({
        data: {
          title: `Novo curso disponível: ${course.title}.`,
        },
      });
    }

    return {
      found: result.total,
      accepted: result.total,
      saved,
      duplicates,
      videosSaved,
    };
  }
}

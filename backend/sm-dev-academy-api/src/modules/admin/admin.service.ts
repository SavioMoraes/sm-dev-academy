import { Injectable } from '@nestjs/common';
import { YoutubeService } from '../youtube/youtube.service';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AdminService {

  constructor(
    private readonly youtubeService: YoutubeService,
    private readonly prismaService: PrismaService,
  ) {}

  async importCourses() {

    const result =
      await this.youtubeService.getCourses();

    let saved = 0;
    let duplicates = 0;

    for (const course of result.courses) {

      const existingCourse =
        await this.prismaService.course.findUnique({
          where: {
            playlistId:
              course.playlistId,
          },
        });

      if (existingCourse) {

        duplicates++;

        continue;

      }

      await this.prismaService.course.create({
        data: {

          playlistId:
            course.playlistId,

          title:
            course.title,

          slug:
            course.playlistId,

          description:
            course.description,

          thumbnail:
            course.thumbnail,

          playlistUrl:
            course.playlistUrl,

          category:
            course.category,

          technology:
            course.technology,

          featured:
            false,

        },
      });

      saved++;

    }

    return {

      found:
        result.total,

      accepted:
        result.total,

      saved,

      duplicates,

    };

  }

}
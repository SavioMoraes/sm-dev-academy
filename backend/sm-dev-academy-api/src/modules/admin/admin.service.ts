import { Injectable } from '@nestjs/common';
import { YoutubeService } from '../youtube/youtube.service';
import { PrismaService } from '../../database/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { NotificationGateway } from '../notification/notification.gateway';

@Injectable()
export class AdminService {
  constructor(
    private readonly youtubeService: YoutubeService,
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly notificationGateway: NotificationGateway,
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

    const totalStartedCourses = await this.prismaService.userCourse.count();

    return {
      totalCourses,
      totalUsers,
      totalAdmins,
      totalStartedCourses,
    };
  }

  async getUsers() {
    return this.prismaService.user.findMany({
      orderBy: {
        name: 'asc',
      },

      include: {
        userCourses: {
          include: {
            course: true,
          },
        },

        _count: {
          select: {
            favorites: true,
          },
        },
      },
    });
  }

  async searchUsers(term: string) {
    return this.prismaService.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: term,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: term,
              mode: 'insensitive',
            },
          },
        ],
      },

      orderBy: {
        name: 'asc',
      },

      include: {
        userCourses: {
          include: {
            course: true,
          },
        },

        _count: {
          select: {
            favorites: true,
          },
        },
      },
    });
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

  async deleteCourseByPlaylistId(playlistId: string, emitEvent = true) {
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

    const notification = await this.prismaService.notification.create({
      data: {
        title: course.title,
        playlistId: course.playlistId,
        action: 'REMOVED',
      },
    });

    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
      },
    });

    await this.prismaService.notificationUser.createMany({
      data: users.map((user) => ({
        userId: user.id,
        notificationId: notification.id,
      })),
    });

    await this.prismaService.course.delete({
      where: {
        id: course.id,
      },
    });

    if (emitEvent) {
      this.notificationGateway.emitNotificationDeleted();
    }

    return {
      success: true,
    };
  }

  async deleteCourses(playlistIds: string[]) {
    for (const playlistId of playlistIds) {
      await this.deleteCourseByPlaylistId(playlistId, false);
    }

    this.notificationGateway.emitNotificationDeleted();

    return {
      success: true,
    };
  }

  // async importCourses(technologies: string[]) {
  //   const existingPlaylistIds = new Set(
  //     (
  //       await this.prismaService.course.findMany({
  //         select: {
  //           playlistId: true,
  //         },
  //       })
  //     ).map((course) => course.playlistId),
  //   );

  //   const processedPlaylistIds = new Set<string>();

  //   const users = await this.prismaService.user.findMany({
  //     select: {
  //       id: true,
  //     },
  //   });

  //   let coursesImported = 0;
  //   let videosImported = 0;
  //   let notificationsCreated = 0;
  //   let processedTechnologies = 0;
  //   let duplicates = 0;

  //   for (const technology of technologies) {
  //     try {
  //       let savedCourses = 0;
  //       let pageToken: string | undefined;

  //       do {
  //         const { playlists, nextPageToken } =
  //           await this.youtubeService.searchPlaylists(technology, pageToken);

  //         pageToken = nextPageToken;

  //         for (const course of playlists) {
  //           if (savedCourses === 5) {
  //             break;
  //           }

  //           if (!course.playlistId) {
  //             continue;
  //           }

  //           if (processedPlaylistIds.has(course.playlistId)) {
  //             continue;
  //           }

  //           if (existingPlaylistIds.has(course.playlistId)) {
  //             duplicates++;
  //             continue;
  //           }

  //           processedPlaylistIds.add(course.playlistId);
  //           existingPlaylistIds.add(course.playlistId);

  //           const createdCourse = await this.prismaService.course.create({
  //             data: {
  //               playlistId: course.playlistId,
  //               title: course.title,
  //               slug: course.playlistId,
  //               description: course.description,
  //               thumbnail: course.thumbnail,
  //               playlistUrl: course.playlistUrl,
  //               category: course.category,
  //               technology: course.technology,
  //               featured: false,
  //             },
  //           });

  //           const videos = await this.youtubeService.getPlaylistVideos(
  //             course.playlistId,
  //           );

  //           for (const video of videos) {
  //             if (!video.videoId) {
  //               continue;
  //             }

  //             await this.prismaService.courseVideo.upsert({
  //               where: {
  //                 videoId: video.videoId,
  //               },

  //               update: {},

  //               create: {
  //                 courseId: createdCourse.id,
  //                 videoId: video.videoId,
  //                 title: video.title,
  //                 thumbnail: video.thumbnail,
  //                 position: video.position,
  //               },
  //             });

  //             videosImported++;
  //           }

  //           const notification = await this.prismaService.notification.create({
  //             data: {
  //               title: course.title,
  //               playlistId: course.playlistId,
  //               action: 'ADDED',
  //             },
  //           });

  //           await this.prismaService.notificationUser.createMany({
  //             data: users.map((user) => ({
  //               userId: user.id,
  //               notificationId: notification.id,
  //             })),
  //           });

  //           savedCourses++;
  //           coursesImported++;
  //           notificationsCreated++;
  //         }
  //       } while (pageToken && savedCourses < 5);
  //       processedTechnologies++;
  //     } catch (error) {
  //       console.error(`Erro ao importar ${technology}`, error);
  //     }
  //   }

  //   if (notificationsCreated > 0) {
  //     this.notificationGateway.emitNotificationCreated();
  //   }

  //   return {
  //     found: coursesImported + duplicates,
  //     accepted: coursesImported + duplicates,
  //     saved: coursesImported,
  //     duplicates,
  //     videosSaved: videosImported,
  //   };
  // }

  async importCourses(technologies: string[]) {
    const existingPlaylistIds = new Set(
      (
        await this.prismaService.course.findMany({
          select: {
            playlistId: true,
          },
        })
      ).map((course) => course.playlistId),
    );

    const processedPlaylistIds = new Set<string>();

    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
      },
    });

    let coursesImported = 0;
    let videosImported = 0;
    let notificationsCreated = 0;
    let processedTechnologies = 0;
    let duplicates = 0;

    for (const technology of technologies) {
      try {
        let savedCourses = 0;
        let pageToken: string | undefined;

        do {
          const { playlists, nextPageToken } =
            await this.youtubeService.searchPlaylists(technology, pageToken);

          pageToken = nextPageToken;

          for (const course of playlists) {
            if (savedCourses === 5) {
              break;
            }

            if (!course.playlistId) {
              continue;
            }

            if (processedPlaylistIds.has(course.playlistId)) {
              continue;
            }

            if (existingPlaylistIds.has(course.playlistId)) {
              duplicates++;
              continue;
            }

            processedPlaylistIds.add(course.playlistId);
            existingPlaylistIds.add(course.playlistId);

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

              videosImported++;
            }

            const notification = await this.prismaService.notification.create({
              data: {
                title: course.title,
                playlistId: course.playlistId,
                action: 'ADDED',
              },
            });

            await this.prismaService.notificationUser.createMany({
              data: users.map((user) => ({
                userId: user.id,
                notificationId: notification.id,
              })),
            });

            // ENVIA O WEBSOCKET IMEDIATAMENTE APÓS SALVAR O CURSO
            this.notificationGateway.emitNotificationCreated();

            savedCourses++;
            coursesImported++;
            notificationsCreated++;
          }
        } while (pageToken && savedCourses < 5);

        processedTechnologies++;
      } catch (error) {
        console.error(`Erro ao importar ${technology}`, error);
      }
    }

    return {
      found: coursesImported + duplicates,
      accepted: coursesImported + duplicates,
      saved: coursesImported,
      duplicates,
      videosSaved: videosImported,
    };
  }

  async resetPassword(userId: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.updatePassword(userId, hashedPassword);
  }
}

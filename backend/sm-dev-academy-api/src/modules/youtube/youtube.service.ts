import { Injectable } from '@nestjs/common';
import axios from 'axios';

const TECHNOLOGIES = [
  'GitHub',
  'ChatGPT',
  'Deep Seek',
  'HTML',
];

const TECHNOLOGY_CATEGORIES: Record<string, string> = {

  GitHub: 'DevOps',
  ChatGPT: 'IA',
  'Deep Seek': 'IA',
  HTML: 'Frontend',

};

@Injectable()
export class YoutubeService {

  async getCourses() {

    const courses: any[] = [];

    for (const technology of TECHNOLOGIES) {

      try {

        const response =
          await axios.get(
            'https://www.googleapis.com/youtube/v3/search',
            {
              params: {

                key:
                  process.env.YOUTUBE_API_KEY,

                q:
                  technology,

                part:
                  'snippet',

                type:
                  'playlist',

                maxResults:
                  4,

              },
            },
          );

        const playlists =
          response.data.items || [];

        for (const playlist of playlists) {

          const playlistId =
            playlist.id?.playlistId;

          if (!playlistId) {
            continue;
          }

          courses.push({

            playlistId,

            title:
              playlist.snippet.title,

            description:
              playlist.snippet.description,

            thumbnail:
              playlist.snippet.thumbnails?.high?.url ||

              playlist.snippet.thumbnails?.default?.url ||

              '',

            playlistUrl:
              `https://www.youtube.com/playlist?list=${playlistId}`,

            category:
              TECHNOLOGY_CATEGORIES[
                technology
              ],

            technology,

            featured:
              false,

          });

        }

      } catch (error: any) {

        console.error(
          `Erro ao buscar ${technology}`,
          error?.response?.status,
          error?.response?.data,
        );

      }

    }

    return {

      total:
        courses.length,

      courses,

    };

  }

  async getPlaylistVideos(
    playlistId: string,
  ) {

    const response =
      await axios.get(
        'https://www.googleapis.com/youtube/v3/playlistItems',
        {
          params: {

            key:
              process.env.YOUTUBE_API_KEY,

            part:
              'snippet',

            playlistId,

            maxResults:
              50,

          },
        },
      );

    const videos =
      response.data.items || [];

    return videos.map(
      (
        video: any,
        index: number,
      ) => ({

        videoId:
          video.snippet
            ?.resourceId
            ?.videoId,

        title:
          video.snippet?.title,

        thumbnail:
          video.snippet
            ?.thumbnails
            ?.high
            ?.url ||

          video.snippet
            ?.thumbnails
            ?.default
            ?.url ||

          '',

        position:
          index + 1,

      }),
    );

  }

}
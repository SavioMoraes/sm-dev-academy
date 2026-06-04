import { Injectable } from '@nestjs/common';

import axios from 'axios';

import { TECHNOLOGIES } from '../../common/constants/technologies';

const TECHNOLOGY_CATEGORIES: Record<string, string> = {

  HTML: 'Frontend',
  CSS: 'Frontend',
  SCSS: 'Frontend',
  'Styled-Components': 'Frontend',
  Tailwind: 'Frontend',
  Bootstrap: 'Frontend',
  JavaScript: 'Frontend',
  TypeScript: 'Frontend',
  React: 'Frontend',
  Angular: 'Frontend',
  Vue: 'Frontend',

  Python: 'Backend',
  'Node.js': 'Backend',
  NestJS: 'Backend',
  Java: 'Backend',
  '.NET': 'Backend',
  PHP: 'Backend',

  MongoDB: 'Database',
  MySQL: 'Database',
  PostgreSQL: 'Database',
  'SQL Server': 'Database',

  'React Native': 'Mobile',
  Flutter: 'Mobile',

  Docker: 'DevOps',
  Git: 'DevOps',
  'CI/CD': 'DevOps',
  Kubernetes: 'DevOps',
  AWS: 'DevOps',
  Azure: 'DevOps',
  GitHub: 'DevOps',

  ChatGPT: 'IA',
  'Vs Code Copilot': 'IA',
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
                  5,

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

}
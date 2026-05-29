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
  Copilot: 'IA',
};

@Injectable()
export class YoutubeService {

  async getCourses() {

    const responses: any[] = [];

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
                  `${technology} curso playlist português`,

                part:
                  'snippet',

                type:
                  'playlist',

                relevanceLanguage:
                  'pt',

                regionCode:
                  'BR',

                maxResults:
                  10,

              },
            },
          );

        responses.push({
          technology,
          response,
        });

      } catch (error) {

        console.error(
          `Erro ao buscar ${technology}`,
        );

      }

    }

    const courses =
      responses.flatMap(
        ({ technology, response }) => {

          const playlists =
            response.data.items || [];

          // const filteredPlaylists =
          //   playlists.filter(
          //     (playlist: any) => {

          //       const title =
          //         playlist.snippet.title.toLowerCase();

          //       return title.includes(
          //         technology.toLowerCase(),
          //       );

          //     },
          //   );

          return playlists.map(
            (playlist: any) => ({

              id:
                playlist.id.playlistId,

              title:
                playlist.snippet.title,

              description:
                playlist.snippet.description,

              thumbnail:
                playlist.snippet.thumbnails.high?.url ||

                playlist.snippet.thumbnails.default?.url,

              playlistUrl:
                `https://www.youtube.com/playlist?list=${playlist.id.playlistId}`,

              category:
                TECHNOLOGY_CATEGORIES[
                  technology
                ] ||

                'Frontend',

              technology,

              language:
                'Português',

              legend:
                null,

              featured:
                false,

            }),
          );

        },
      );

      courses.sort(
        () => Math.random() - 0.5,
      );

    return {

      total:
        courses.length,

      courses,

    };

  }

}
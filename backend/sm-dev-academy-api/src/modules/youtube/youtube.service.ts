import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TECHNOLOGY_CATEGORIES } from '../../common/constants/technology-categories';

@Injectable()
export class YoutubeService {
  async searchPlaylists(technology: string, pageToken?: string) {
    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          key: process.env.YOUTUBE_API_KEY,
          q: technology,
          part: 'snippet',
          type: 'playlist',
          maxResults: 50,
          pageToken,
        },
      },
    );

    const playlists =
      response.data.items?.map((playlist: any) => {
        const playlistId = playlist.id?.playlistId;

        return {
          playlistId,
          title: playlist.snippet.title,
          description: playlist.snippet.description,
          thumbnail:
            playlist.snippet.thumbnails?.high?.url ||
            playlist.snippet.thumbnails?.default?.url ||
            '',
          playlistUrl: `https://www.youtube.com/playlist?list=${playlistId}`,
          category:
            TECHNOLOGY_CATEGORIES[
              technology as keyof typeof TECHNOLOGY_CATEGORIES
            ],
          technology,
          featured: false,
        };
      }) ?? [];

    return {
      playlists,
      nextPageToken: response.data.nextPageToken,
    };
  }

  async getPlaylistVideos(playlistId: string) {
    const videos: any[] = [];

    let nextPageToken: string | undefined;

    do {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/playlistItems',
        {
          params: {
            key: process.env.YOUTUBE_API_KEY,
            part: 'snippet',
            playlistId,
            maxResults: 50,
            pageToken: nextPageToken,
          },
        },
      );

      const items = response.data.items ?? [];

      for (const item of items) {
        const videoId = item.snippet?.resourceId?.videoId;

        if (!videoId) {
          continue;
        }

        videos.push({
          videoId,
          title: item.snippet.title,
          thumbnail:
            item.snippet.thumbnails?.high?.url ||
            item.snippet.thumbnails?.default?.url ||
            '',
        });
      }

      nextPageToken = response.data.nextPageToken;
    } while (nextPageToken);

    return videos.map((video, index) => ({
      ...video,
      position: index + 1,
    }));
  }
}

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class VideoService {

  async searchVideos(
    search: string,
    pageToken?: string,
  ) {

    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          key: process.env.YOUTUBE_API_KEY,
          part: 'snippet',
          q: search,
          type: 'video',
          maxResults: 12,
          pageToken,
        },
      },
    );

    return {
      videos: response.data.items,
      nextPageToken: response.data.nextPageToken,
    };
  }

}
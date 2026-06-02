import { Injectable } from '@nestjs/common';

import { YoutubeService } from '../youtube/youtube.service';

@Injectable()
export class AdminService {

  constructor(
    private readonly youtubeService: YoutubeService,
  ) {}

  async importCourses() {

    const result =
      await this.youtubeService.getCourses();

    return {
      found: result.total,
      accepted: result.total,
      saved: 0,
      duplicates: 0,
      courses: result.courses,
    };

  }

}
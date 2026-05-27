import { Controller, Get, Query } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller('videos')
export class VideoController {

  constructor(
    private readonly videoService: VideoService,
  ) {}

  @Get()
  async searchVideos(
    @Query('search') search: string,
    @Query('pageToken') pageToken?: string,
  ) {

    return this.videoService.searchVideos(search, pageToken);
  }

}
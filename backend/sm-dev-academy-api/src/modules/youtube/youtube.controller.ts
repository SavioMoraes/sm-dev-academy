import {
  Controller,
  Get,
} from '@nestjs/common';

import { YoutubeService } from './youtube.service';

@Controller('learn')
export class YoutubeController {

  constructor(
    private readonly youtubeService: YoutubeService,
  ) {}

  @Get('courses')
  async getCourses() {

    return this.youtubeService.getCourses();

  }

}
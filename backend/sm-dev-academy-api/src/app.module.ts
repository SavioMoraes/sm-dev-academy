import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CourseModule } from './modules/course/course.module';
import { VideoModule } from './modules/video/video.module';

@Module({
  imports: [
    DatabaseModule,
    CourseModule,
    VideoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
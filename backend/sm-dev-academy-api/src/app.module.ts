import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CourseModule } from './modules/course/course.module';
import { VideoModule } from './modules/video/video.module';
import { YoutubeModule } from './modules/youtube/youtube.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { MyCourseModule } from './modules/my-course/my-course.module';

@Module({
  imports: [
    DatabaseModule,
    CourseModule,
    VideoModule,
    YoutubeModule,
    AuthModule,
    AdminModule,
    FavoriteModule,
    MyCourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
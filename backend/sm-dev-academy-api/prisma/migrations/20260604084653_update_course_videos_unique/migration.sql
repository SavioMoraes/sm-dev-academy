/*
  Warnings:

  - A unique constraint covering the columns `[videoId]` on the table `course_videos` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "course_videos_courseId_videoId_key";

-- CreateIndex
CREATE UNIQUE INDEX "course_videos_videoId_key" ON "course_videos"("videoId");

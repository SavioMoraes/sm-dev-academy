/*
  Warnings:

  - A unique constraint covering the columns `[playlistId]` on the table `courses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `playlistId` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "playlistId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "courses_playlistId_key" ON "courses"("playlistId");

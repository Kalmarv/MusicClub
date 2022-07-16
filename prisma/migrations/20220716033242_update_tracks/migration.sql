/*
  Warnings:

  - A unique constraint covering the columns `[spotifyTrackId]` on the table `Track` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `spotifyTrackId` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "spotifyTrackId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Track_spotifyTrackId_key" ON "Track"("spotifyTrackId");

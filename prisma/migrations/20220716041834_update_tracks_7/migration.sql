/*
  Warnings:

  - You are about to drop the column `albumId` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `spotifyAlbumId` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `spotifyTrackId` on the `Track` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[trackId]` on the table `Track` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `trackId` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_albumId_fkey";

-- DropIndex
DROP INDEX "Track_spotifyTrackId_key";

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "albumId",
DROP COLUMN "spotifyAlbumId",
DROP COLUMN "spotifyTrackId",
ADD COLUMN     "trackId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Track_trackId_key" ON "Track"("trackId");

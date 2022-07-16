/*
  Warnings:

  - You are about to drop the column `albumId` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `spotifyId` on the `Track` table. All the data in the column will be lost.
  - Added the required column `spotifyAlbumId` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_albumId_fkey";

-- DropIndex
DROP INDEX "Track_spotifyId_key";

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "albumId",
DROP COLUMN "spotifyId",
ADD COLUMN     "spotifyAlbumId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_spotifyAlbumId_fkey" FOREIGN KEY ("spotifyAlbumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

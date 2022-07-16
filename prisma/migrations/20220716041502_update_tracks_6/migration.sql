/*
  Warnings:

  - Added the required column `albumId` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_spotifyAlbumId_fkey";

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "albumId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

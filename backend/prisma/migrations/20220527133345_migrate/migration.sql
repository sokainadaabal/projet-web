/*
  Warnings:

  - You are about to drop the `refreshtoken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `refreshtoken` DROP FOREIGN KEY `RefreshToken_userId_fkey`;

-- AlterTable
ALTER TABLE `post` ALTER COLUMN `updateAt` DROP DEFAULT;

-- DropTable
DROP TABLE `refreshtoken`;

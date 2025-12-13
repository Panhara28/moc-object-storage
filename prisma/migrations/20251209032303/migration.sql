/*
  Warnings:

  - A unique constraint covering the columns `[accessKeyId]` on the table `buckets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accessKeyId` to the `buckets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accessKeyName` to the `buckets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secretAccessKey` to the `buckets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `buckets` ADD COLUMN `accessKeyId` VARCHAR(191) NOT NULL,
    ADD COLUMN `accessKeyName` VARCHAR(191) NOT NULL,
    ADD COLUMN `permission` ENUM('READ', 'READ_WRITE', 'FULL_ACCESS') NOT NULL DEFAULT 'FULL_ACCESS',
    ADD COLUMN `secretAccessKey` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `buckets_accessKeyId_key` ON `buckets`(`accessKeyId`);

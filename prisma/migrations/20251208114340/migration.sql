/*
  Warnings:

  - You are about to drop the column `isAvailable` on the `medias` table. All the data in the column will be lost.
  - Added the required column `bucketId` to the `medias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bucketId` to the `spaces` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `books_author_idx` ON `books`;

-- DropIndex
DROP INDEX `books_title_idx` ON `books`;

-- DropIndex
DROP INDEX `books_year_idx` ON `books`;

-- AlterTable
ALTER TABLE `medias` DROP COLUMN `isAvailable`,
    ADD COLUMN `bucketId` INTEGER NOT NULL,
    ADD COLUMN `isPrivate` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `path` VARCHAR(191) NULL,
    ADD COLUMN `visibility` ENUM('AVAILABLE', 'PUBLIC', 'PRIVATE', 'RESTRICTED', 'REMOVE', 'RECOVERY', 'DRAFTED', 'PUBLISHED', 'UNPUBLISHED') NOT NULL DEFAULT 'PUBLIC';

-- AlterTable
ALTER TABLE `spaces` ADD COLUMN `bucketId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `buckets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `createdById` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `buckets_name_key`(`name`),
    UNIQUE INDEX `buckets_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `buckets` ADD CONSTRAINT `buckets_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medias` ADD CONSTRAINT `medias_bucketId_fkey` FOREIGN KEY (`bucketId`) REFERENCES `buckets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `spaces` ADD CONSTRAINT `spaces_bucketId_fkey` FOREIGN KEY (`bucketId`) REFERENCES `buckets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

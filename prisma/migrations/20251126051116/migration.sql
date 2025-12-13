-- CreateTable
CREATE TABLE `media_upload_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mediaUploadId` INTEGER NOT NULL,
    `mediaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `media_upload_details` ADD CONSTRAINT `media_upload_details_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `medias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NULL,
    `slug` VARCHAR(191) NOT NULL,
    `profilePicture` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `fullNameKh` VARCHAR(191) NULL,
    `fullNameEn` VARCHAR(191) NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHER') NULL,
    `generalDepartment` VARCHAR(191) NULL,
    `department` VARCHAR(191) NULL,
    `office` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `currentRole` VARCHAR(191) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_slug_key`(`slug`),
    INDEX `users_roleId_idx`(`roleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `slug` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `roles_name_key`(`name`),
    UNIQUE INDEX `roles_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `slug` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `permissions_name_key`(`name`),
    UNIQUE INDEX `permissions_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_permissions` (
    `roleId` INTEGER NOT NULL,
    `moduleId` INTEGER NOT NULL,
    `create` BOOLEAN NOT NULL DEFAULT false,
    `read` BOOLEAN NOT NULL DEFAULT false,
    `update` BOOLEAN NOT NULL DEFAULT false,
    `delete` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `role_permissions_slug_key`(`slug`),
    PRIMARY KEY (`roleId`, `moduleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `buckets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `createdById` INTEGER NOT NULL,
    `accessKeyName` VARCHAR(191) NOT NULL,
    `accessKeyId` VARCHAR(191) NOT NULL,
    `secretAccessKey` VARCHAR(191) NOT NULL,
    `permission` ENUM('READ', 'READ_WRITE', 'FULL_ACCESS') NOT NULL DEFAULT 'FULL_ACCESS',
    `isAvailable` ENUM('AVAILABLE', 'PUBLIC', 'PRIVATE', 'RESTRICTED', 'REMOVE', 'RECOVERY', 'DRAFTED', 'PUBLISHED', 'UNPUBLISHED') NOT NULL DEFAULT 'AVAILABLE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `buckets_name_key`(`name`),
    UNIQUE INDEX `buckets_slug_key`(`slug`),
    UNIQUE INDEX `buckets_accessKeyId_key`(`accessKeyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `filename` VARCHAR(191) NOT NULL,
    `storedFilename` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `bucketId` INTEGER NOT NULL,
    `path` VARCHAR(191) NULL,
    `fileType` ENUM('IMAGE', 'VIDEO', 'AUDIO', 'PDF', 'DOCUMENT', 'OTHER') NOT NULL,
    `mimetype` VARCHAR(191) NOT NULL,
    `extension` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `title` VARCHAR(191) NULL,
    `altText` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `uploadedById` INTEGER NOT NULL,
    `isVisibility` ENUM('AVAILABLE', 'PUBLIC', 'PRIVATE', 'RESTRICTED', 'REMOVE', 'RECOVERY', 'DRAFTED', 'PUBLISHED', 'UNPUBLISHED') NOT NULL DEFAULT 'AVAILABLE',
    `isAccessible` ENUM('AVAILABLE', 'PUBLIC', 'PRIVATE', 'RESTRICTED', 'REMOVE', 'RECOVERY', 'DRAFTED', 'PUBLISHED', 'UNPUBLISHED') NOT NULL DEFAULT 'PRIVATE',
    `width` INTEGER NULL,
    `height` INTEGER NULL,
    `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `medias_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `media_uploads` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `media_uploads_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `media_upload_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mediaUploadId` INTEGER NOT NULL,
    `mediaId` INTEGER NOT NULL,
    `spaceId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `spaces` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `parentId` INTEGER NULL,
    `isAvailable` ENUM('AVAILABLE', 'PUBLIC', 'PRIVATE', 'RESTRICTED', 'REMOVE', 'RECOVERY', 'DRAFTED', 'PUBLISHED', 'UNPUBLISHED') NOT NULL DEFAULT 'AVAILABLE',
    `uploadedAt` DATETIME(3) NULL,
    `bucketId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `mediaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `spaces_slug_key`(`slug`),
    INDEX `spaces_parentId_idx`(`parentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `permissions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `buckets` ADD CONSTRAINT `buckets_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medias` ADD CONSTRAINT `medias_bucketId_fkey` FOREIGN KEY (`bucketId`) REFERENCES `buckets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medias` ADD CONSTRAINT `medias_uploadedById_fkey` FOREIGN KEY (`uploadedById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `media_uploads` ADD CONSTRAINT `media_uploads_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `media_upload_details` ADD CONSTRAINT `media_upload_details_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `medias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `media_upload_details` ADD CONSTRAINT `media_upload_details_mediaUploadId_fkey` FOREIGN KEY (`mediaUploadId`) REFERENCES `media_uploads`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `media_upload_details` ADD CONSTRAINT `media_upload_details_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `spaces`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `spaces` ADD CONSTRAINT `spaces_bucketId_fkey` FOREIGN KEY (`bucketId`) REFERENCES `buckets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `spaces` ADD CONSTRAINT `spaces_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `spaces` ADD CONSTRAINT `spaces_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `spaces`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `spaces` ADD CONSTRAINT `spaces_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `medias`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

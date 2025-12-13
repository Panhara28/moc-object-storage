-- AlterTable
ALTER TABLE `users` ADD COLUMN `currentRole` VARCHAR(191) NULL,
    ADD COLUMN `department` VARCHAR(191) NULL,
    ADD COLUMN `fullNameEn` VARCHAR(191) NULL,
    ADD COLUMN `fullNameKh` VARCHAR(191) NULL,
    ADD COLUMN `gender` ENUM('MALE', 'FEMALE', 'OTHER') NULL,
    ADD COLUMN `generalDepartment` VARCHAR(191) NULL,
    ADD COLUMN `office` VARCHAR(191) NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NULL;

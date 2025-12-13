/*
  Warnings:

  - You are about to drop the `audiences` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `books` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `news` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `otps` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `books` DROP FOREIGN KEY `books_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `books` DROP FOREIGN KEY `books_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `books` DROP FOREIGN KEY `books_mediaId_fkey`;

-- DropForeignKey
ALTER TABLE `books` DROP FOREIGN KEY `books_updatedById_fkey`;

-- DropForeignKey
ALTER TABLE `categories` DROP FOREIGN KEY `categories_parentId_fkey`;

-- DropForeignKey
ALTER TABLE `news` DROP FOREIGN KEY `news_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `news` DROP FOREIGN KEY `news_new_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `news` DROP FOREIGN KEY `news_updatedById_fkey`;

-- DropForeignKey
ALTER TABLE `otps` DROP FOREIGN KEY `otps_userId_fkey`;

-- DropTable
DROP TABLE `audiences`;

-- DropTable
DROP TABLE `books`;

-- DropTable
DROP TABLE `categories`;

-- DropTable
DROP TABLE `news`;

-- DropTable
DROP TABLE `otps`;

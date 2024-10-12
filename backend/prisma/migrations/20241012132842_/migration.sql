-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `birth_date` DATETIME(3) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHERS') NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

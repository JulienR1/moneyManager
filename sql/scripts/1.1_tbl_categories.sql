CREATE TABLE `categories`(
	`id` INT NOT NULL AUTO_INCREMENT,
    `title` TINYTEXT NOT NULL,
    `iconId` INT NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`iconId`) REFERENCES icons(`id`)
);
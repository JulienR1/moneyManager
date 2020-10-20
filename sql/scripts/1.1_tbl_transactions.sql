CREATE TABLE `transactions`(
	`id` INT NOT NULL AUTO_INCREMENT,
    `title` TINYTEXT NOT NULL,
    `amount` FLOAT NOT NULL,
    `transactionDate` DATE NOT NULL,
    `proofSrc` TINYTEXT,
    `categoryId` INT NOT NULL,
    `isIncome` BOOL NOT NULL,
    PRIMARY KEY(`id`),
	FOREIGN KEY(`categoryId`) REFERENCES categories(`id`)
);
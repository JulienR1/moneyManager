CREATE TABLE `users` (
`id` INT NOT NULL AUTO_INCREMENT,
`firstname` TINYTEXT NOT NULL,
`lastname` TINYTEXT NOT NULL,
`email` TINYTEXT NOT NULL,
`password` LONGTEXT NOT NULL,
`creationDate` DATE NOT NULL,
`img` TINYTEXT,
PRIMARY KEY(`id`)
)
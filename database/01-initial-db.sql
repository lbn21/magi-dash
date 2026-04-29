use definitions;

CREATE TABLE IF NOT EXISTS `dashboards`
(
    `id`        int(11)      NOT NULL AUTO_INCREMENT,
    `title`     VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP    NOT NULL DEFAULT NOW(),
    `updatedAt` TIMESTAMP    NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    PRIMARY KEY (`id`)
    ) ENGINE = InnoDB
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;

INSERT INTO `dashboards` (`title`) VALUES
                                       ('Sales Performance'),
                                       ('Customer Engagement'),
                                       ('Operations Overview'),
                                       ('Marketing Funnel'),
                                       ('Finance Dashboard');
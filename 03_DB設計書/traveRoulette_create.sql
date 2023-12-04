CREATE TABLE areas(
    area_id   INT NOT NULL AUTO_INCREMENT,
    area_name VARCHAR(64) NOT NULL,
    PRIMARY KEY (area_id)
);

CREATE TABLE attributes(
    attribute_id INT NOT NULL AUTO_INCREMENT,
    attribute_name VARCHAR(64) NOT NULL,
    PRIMARY KEY (attribute_id)
);

CREATE TABLE prefectures(
    prefecture_id   INT         NOT NULL AUTO_INCREMENT,
    prefecture_name VARCHAR(64) NOT NULL,
    area_id         INT         NOT NULL,
    PRIMARY KEY (prefecture_id),
    FOREIGN KEY (area_id) REFERENCES areas(area_id)
);

CREATE TABLE attractions(
    attraction_id   INT           NOT NULL AUTO_INCREMENT,
    attraction_name VARCHAR(512)  NOT NULL,
    attribute_id    INT           NOT NULL,
    prefecture_id   INT           NOT NULL,
    explanation     VARCHAR(4028) NOT NULL,
    PRIMARY KEY (attraction_id),
    FOREIGN KEY (attribute_id) REFERENCES attributes(attribute_id),
    FOREIGN KEY (prefecture_id) REFERENCES prefectures(prefecture_id)
);
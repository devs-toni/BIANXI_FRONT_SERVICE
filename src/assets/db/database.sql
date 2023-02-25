DROP DATABASE IF EXISTS bianxi;
CREATE DATABASE IF NOT EXISTS bianxi;
USE bianxi;

SELECT 'CREATING DATABASE STRUCTURE' as 'INFO';

DROP TABLE IF EXISTS products, 
                     product_colors,
                     product_sizes,
                     product_datasheet,
                     users,
                     user_orders, 
                     product_in_order;

CREATE TABLE products (
    id          INT                    AUTO_INCREMENT NOT NULL,
    name        VARCHAR(255)           NOT NULL,
    type        ENUM('R','M','E','C')  NOT NULL,
    price       INT                    NOT NULL,
    offer       INT                    NOT NULL,
    stock       INT                    NOT NULL,
    sentence    TEXT                   NOT NULL,    
    description VARCHAR(255)           NOT NULL,    
    PRIMARY KEY (id)
);

CREATE TABLE product_colors (
   id          INT                AUTO_INCREMENT NOT NULL,
   product_id  INT                NOT NULL,
   color       VARCHAR(60)        NOT NULL,
   FOREIGN KEY (product_id)       REFERENCES products (id) ON DELETE CASCADE,
   PRIMARY KEY (id)
);

CREATE TABLE product_sizes (
   id          INT                AUTO_INCREMENT NOT NULL,
   product_id  INT                NOT NULL,
   size        CHAR(3)            NOT NULL,
   FOREIGN KEY (product_id)       REFERENCES products (id) ON DELETE CASCADE,
   PRIMARY KEY (id)
);

CREATE TABLE product_datasheet (
   id          INT                AUTO_INCREMENT NOT NULL,
   product_id  INT                NOT NULL,
   featureName VARCHAR(100)       NOT NULL,
   feature     VARCHAR(100)       NOT NULL,
   FOREIGN KEY (product_id)       REFERENCES products (id) ON DELETE CASCADE,
   PRIMARY KEY (id)
);

CREATE TABLE users (
    id         INT                AUTO_INCREMENT NOT NULL,
    firstName  VARCHAR(60)        NOT NULL,
    lastName   VARCHAR(60)        NOT NULL, 
    email      VARCHAR(255)       NOT NULL, 
    username   VARCHAR(30)        NOT NULL, 
    password   VARCHAR(255)       NOT NULL, 
    PRIMARY KEY (id)
); 

CREATE TABLE user_orders (
    id       INT                  AUTO_INCREMENT NOT NULL,
    user_id  INT                  NOT NULL,
    ref      INT                  NOT NULL,
    address  VARCHAR(255)         NOT NULL,
    company  VARCHAR(30)          NOT NULL,
    price    FLOAT                NOT NULL,
    FOREIGN KEY (user_id)         REFERENCES users (id) ON DELETE CASCADE,
    PRIMARY KEY (id)
); 

CREATE TABLE product_in_order (
    id          INT               AUTO_INCREMENT NOT NULL,
    order_id    INT               NOT NULL,
    product_id  INT               NOT NULL,
    FOREIGN KEY (order_id)        REFERENCES user_orders (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id)      REFERENCES products (id) ON DELETE CASCADE,
    PRIMARY KEY (id)
); 
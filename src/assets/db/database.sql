DROP DATABASE IF EXISTS bianxi;
CREATE DATABASE IF NOT EXISTS bianxi;
USE bianxi;

SELECT 'CREATING DATABASE STRUCTURE' as 'INFO';

DROP TABLE IF EXISTS products, 
                     colors,
                     sizes,
                     datasheets,
                     users,
                     orders, 
                     order_products;

CREATE TABLE products (
    id          BIGINT                 AUTO_INCREMENT NOT NULL,
    name        VARCHAR(255)           NOT NULL,
    type        VARCHAR(10)            NOT NULL,
    price       INT                    NOT NULL,
    offer       INT                    NOT NULL,
    sentence    TEXT                   NOT NULL,    
    description VARCHAR(255)           NOT NULL,    
    PRIMARY KEY (id)
);

CREATE TABLE colors (
   id          BIGINT             AUTO_INCREMENT NOT NULL,
   product_id  BIGINT             NOT NULL,
   color       VARCHAR(60)        NOT NULL,
   FOREIGN KEY (product_id)       REFERENCES products (id) ON DELETE CASCADE,
   PRIMARY KEY (id)
);

CREATE TABLE sizes (
   id          BIGINT             AUTO_INCREMENT NOT NULL,
   product_id  BIGINT             NOT NULL,
   size        CHAR(3)            NOT NULL,
   FOREIGN KEY (product_id)       REFERENCES products (id) ON DELETE CASCADE,
   PRIMARY KEY (id)
);

CREATE TABLE stock_colors_sizes (
   id          BIGINT             AUTO_INCREMENT NOT NULL,
   product_id  BIGINT             NOT NULL,
   config_id   BIGINT             NOT NULL,
   color_id    BIGINT             NOT NULL,
   size_id     BIGINT             NOT NULL,
   stock       INT                NOT NULL,
   FOREIGN KEY (product_id)       REFERENCES products (id) ON DELETE CASCADE,
   FOREIGN KEY (color_id)         REFERENCES colors (id) ON DELETE CASCADE,
   FOREIGN KEY (size_id)          REFERENCES sizes (id) ON DELETE CASCADE,
   PRIMARY KEY (config_id)
);

CREATE TABLE datasheets (
   id          BIGINT             AUTO_INCREMENT NOT NULL,
   product_id  BIGINT             NOT NULL,
   featureName VARCHAR(100)       NOT NULL,
   feature     VARCHAR(100)       NOT NULL,
   FOREIGN KEY (product_id)       REFERENCES products (id) ON DELETE CASCADE,
   PRIMARY KEY (id)
);

CREATE TABLE users (
    id         BIGINT             AUTO_INCREMENT NOT NULL,
    firstName  VARCHAR(60)        NOT NULL,
    lastName   VARCHAR(60)        NOT NULL, 
    email      VARCHAR(255)       NOT NULL, 
    username   VARCHAR(30)        NOT NULL, 
    password   VARCHAR(255)       NOT NULL, 
    PRIMARY KEY (id)
); 

CREATE TABLE orders (
    id       BIGINT               AUTO_INCREMENT NOT NULL,
    user_id  BIGINT               NOT NULL,
    ref      BIGINT               NOT NULL,
    address  VARCHAR(255)         NOT NULL,
    company  VARCHAR(30)          NOT NULL,
    price    FLOAT                NOT NULL,
    FOREIGN KEY (user_id)         REFERENCES users (id) ON DELETE CASCADE,
    PRIMARY KEY (id)
); 

CREATE TABLE order_products (
    id          BIGINT            AUTO_INCREMENT NOT NULL,
    order_id    BIGINT            NOT NULL,
    product_id  BIGINT            NOT NULL,
    FOREIGN KEY (order_id)        REFERENCES orders (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id)      REFERENCES products (id) ON DELETE CASCADE,
    PRIMARY KEY (id)
); 
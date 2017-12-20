DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name TEXT NOT NULL,
    department_name TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    product_sales DECIMAL(10, 2),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
('Stainless Steel Chefs Knife', 'Kitchen', 23.99, 23),
('EXPO Dry Erase Markers', 'Office Products', 14.00, 56),
('Kindle', 'Electronics', 99.99, 200),
('Fitbit Smartwatch', 'Electronics', 269.95, 48),
('Bluetooth Wireless Headphones', 'Electronics', 19.49, 143),
('RFID Wallet', 'Bamazon Fashion', 11.99, 78),
('Large Drawstring Handbag', 'Bamazon Fashion', 9.99, 56),
('Kids Balance Bike', 'Sports & Outdoors', 35.99, 30),
('Camo Binoculars', 'Sports & Outdoors', 62.99, 77),
('BamazonBasics High-Back Executive Chair', 'Office Products', 109.99, 60);

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name TEXT NOT NULL,
    over_head_costs DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Kitchen', 3000),
('Office Products', 6000),
('Electronics', 10000),
('Bamazon Fashion', 8000),
('Sports & Outdoors', 7000);
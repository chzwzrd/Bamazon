DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name TEXT NOT NULL,
    department_name TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
('iMarku Pro Kitchen 8 inch Chefs Knife High Carbon Stainless Steel', 'Kitchen & Dining', 23.99, 23),
('EXPO Low-Odor Dry Erase Markers, Chisel-Tip, Assorted Colors, 36-Count', 'Office Products', 14.00, 56),
('Kindle Paperwhite E-Reader Black 6" High-Resolution Display (300 ppi) with Built-in Light, Wi-Fi', 'Bamazon Devices', 99.99, 200),
('Fitbit Ionic Smartwatch, Blue-Gray/Silver, One Size (S & L Bands Included)', 'Health & Personal Care', 269.95, 48),
('Bluetooth Headphones, TaoTronics Wireless 4.1 Magnetic Earbuds with Built-in Mic Blue', 'Cell Phones & Accessories', 19.49, 143),
('Mens Slim Front Pocket Wallet ID Window Card Case with RFID Blocking', 'Bamazon Fashion', 11.99, 78),
('Scarleton Large Drawstring Handbag H1078', 'Amazon Fashion', 9.99, 56),
('Enkeeo No Pedal Balance Bike for Ages 2 to 5, 110 lbs Capacity (10/12 inch)', 'Sports & Outdoors', 35.99, 30),
('Bushnell Trophy Binocular, 10x42mm', 'Sports & Outdoors', 62.99, 77),
('BamazonBasics High-Back Executive Chair - Brown', 'Office Products', 109.99, 60);

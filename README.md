# Bamazon <a id="top"></a>
Week 12 Homework

___

## Overview
Simple command line storefront with two functionalities:

* [**Customer**](#customer-demo)
	* allows user to view and purchase products
* [**Manager**](#manager-demo)
	* allows user to view, update, add, and remove products

___

## Setup
To run this application, you will need [MySQL](https://dev.mysql.com/doc/refman/5.6/en/installing.html) and [Node JS](https://nodejs.org/en/download/) installed on your computer.

#### MySQL Database Setup (Instructions by [angrbrd](https://github.com/angrbrd/))
If you do not have MySQL database already set up on your machine, visit the [MySQL installation page](https://dev.mysql.com/doc/refman/5.6/en/installing.html) to install the version you need for your operating system. Once you have MySQL installed, you will be able to create the *Bamazon* database and the *products* table with the SQL code found in [bamazon.sql](bamazon.sql). Run this code inside your MySQL client (like [Sequel Pro](https://www.sequelpro.com/) or [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)) to populate the database, then you will be ready to proceed with running the Bamazon customer and manager interfaces.

#### Run Application
Once you have the Bamazon database set up, run these commands in the command line:

```
git clone https://github.com/chzwzrd/Bamazon.git
cd Bamazon
npm install
node bamazonCustomer.js
```
Note: type `node bamazonManager.js` to access the manager portal

___

## Customer Demo <a id="customer-demo"></a>
The customer interface:

```
1) Presents the customer with a table of all available products
2) Asks for the ID of the customer's desired product
3) Asks how many items the customer would like to purchase
4) Confirms order & updates product inventory in database
```
![customer demo][1_bamazonCustomer]

[Scroll to top](#top)

___

## Manager Demo <a id="manager-demo"></a>
The manager interface presents a list of actions:

![manager demo: list of actions][2_bamazonManager]

___

```
1) View Products for Sale
Displays a table of all active products available to the customer
```
![manager demo: view active products][3_bamazonManager]

___


```
2) View Low Inventory
Displays a table of all products with fewer than 5 items in stock
(or a message that there are no low-stock items)
```
![manager demo: view low inventory][4_bamazonManager]

___

```
3) Add to Inventory
Allows the manager to add more items to a product's inventory
```
![manager demo: add to inventory][5_bamazonManager]

___

```
4) Add New Product
Allows the manager to list a new product that is available for purchase
```
![manager demo: add new product][6_bamazonManager]

___

```
5) Remove A Product
Allows the manager to remove a product from the store
```
![manager demo: remove a product][7_bamazonManager]

[Scroll to top](#top)

___

## Technologies Used
* JavaScript
*  [Node JS](https://nodejs.org/en/download/)
* [MySQL](https://dev.mysql.com/doc/refman/5.6/en/installing.html)
* NPM Packages:
	- [mysql](https://www.npmjs.com/package/mysql)
	- [inquirer](https://www.npmjs.com/package/inquirer)
	- [chalk](https://www.npmjs.com/package/chalk)
	- [cli-table](https://www.npmjs.com/package/cli-table)

___

## Contributors
[Melodie Chi](https://github.com/chzwzrd/) (Inspiration for this README is credited to: [angrbrd](https://github.com/angrbrd/), [kellymersereau](https://github.com/kellymersereau), and [ramirolpz55](https://github.com/ramirolpz55))

___

## Contributing (Instructions by [ramirolpz55](https://github.com/ramirolpz55))
To contribute to this application:
1. Fork the repo
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

___

## License
&copy; 2017 UCI Coding Bootcamp | Melodie Chi

[1_bamazonCustomer]: 
http://g.recordit.co/nYYlpy6D49.gif "customer demo"

[2_bamazonManager]: 
https://github.com/chzwzrd/Bamazon/blob/master/screenshots/2.png "list of actions"

[3_bamazonManager]: 
https://github.com/chzwzrd/Bamazon/blob/master/screenshots/3.png "view active products"

[4_bamazonManager]: 
https://github.com/chzwzrd/Bamazon/blob/master/screenshots/4.png "view low inventory"

[5_bamazonManager]: 
https://github.com/chzwzrd/Bamazon/blob/master/screenshots/5.png "add to inventory"

[6_bamazonManager]: 
https://github.com/chzwzrd/Bamazon/blob/master/screenshots/6.png "add new product"

[7_bamazonManager]: 
https://github.com/chzwzrd/Bamazon/blob/master/screenshots/7.png "remove a product"

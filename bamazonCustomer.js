var mysql = require('mysql');
var inquirer = require('inquirer');
var chalk = require('chalk');

var connection = mysql.createConnection({
    host: '',
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connection successful');
    start();
});

var displayItems = function() {
    connection.query('SELECT * FROM products', (err, res) => {
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
            console.log(chalk.blue.bold(`\n\tItem ID: ${res[i].item_id}\n\tProduct Name: ${res[i].product_name}\n\tPrice: $${res[i].price}\n\n--------------------------------`));
        }
    });
};

var start = function() {
    displayItems();
};
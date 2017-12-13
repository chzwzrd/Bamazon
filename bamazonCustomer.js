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
    displayItems();
});

var displayItems = function() {
    connection.query(`SELECT item_id, product_name, price FROM products`, (err, res) => {
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
            console.log(chalk.blue.bold(`\n\tItem ID: ${res[i].item_id}\n\tProduct Name: ${res[i].product_name}\n\tPrice: $${res[i].price}\n\n--------------------------------`));
        }
        start();
    });
};

var start = function() {
    inquirer.prompt({
        name: 'itemID',
        type: 'input',
        message: 'Enter the ID of the item you would like to purchase: ',
        validate: (value) => {
            if (!isNaN(value)) {
                return true;
            } else {
                return false;
            }
        }
    }).then((answer) => {
        connection.query('SELECT item_id, product_name, price FROM products WHERE ?', { item_id: answer.itemID }, (err, res) => {
            inquirer.prompt({
                name: 'confirmItem',
                type: 'confirm',
                message: `You chose` + chalk.cyan(` '${res[0].product_name}'. `) + `Is this correct?`
            }).then((answer) => {
                if (answer.confirmItem) {
                    console.log('hello');
                }
                else {
                    console.log('oops');
                }
            });
        });
    });
};
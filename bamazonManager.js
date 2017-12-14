// SETUP
// =====================================================================================
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
    // display all items from database once mysql connection has been established
    resetData();
    displayMenu();
});

// GLOBAL VARIABLES
// =====================================================================================
var itemList = [];
var itemToUpdate = [];
var itemToDelete = [];

// FUNCTIONS
// =====================================================================================
var resetData = function() {
    itemToUpdate = [];
    itemToDelete = [];
}

var displayMenu = function() {
    inquirer.prompt({
        name: 'action',
        type: 'rawlist',
        message: 'Choose an action:',
        choices: [
            'View Products for Sale',
            'View Low Inventory',
            'Add to Inventory',
            'Add New Product',
            'Remove A Product'
        ]
    }).then((answer) => {
        switch (answer.action) {
            case 'View Products for Sale':
                viewActiveProducts();
            break;
            case 'View Low Inventory':
                viewLowInventory();
            break;
            case 'Add to Inventory':
                addToInventory();
            break;
            case 'Add New Product':
                addNewProduct();
            break;
            case 'Remove A Product':
                deleteProduct();
            break;
        }
    });
};

var viewActiveProducts = function() {
    connection.query(`SELECT * FROM products`, (err, res) => {
        for (var i = 0; i < res.length; i++) {
            console.log(chalk.blue.bold(`\n\tItem ID: ${res[i].item_id}\n\tProduct Name: ${res[i].product_name}\n\tPrice: $${res[i].price}\n`));
        }
        connection.end();
    });
};

var viewLowInventory = function() {
    connection.query(`SELECT * FROM products WHERE stock_quantity < 5 ORDER BY stock_quantity DESC`, (err, res) => {
        if (res.length > 0) {
            for (var i = 0; i < res.length; i++) {
                console.log(chalk.blue.bold(`\n\tStock Quantity: ${res[i].stock_quantity}\n\tItem ID: ${res[i].item_id}\n\tProduct Name: ${res[i].product_name}\n\tPrice: $${res[i].price}\n`));
            }
        } else {
            console.log(chalk.blue.bold('No low-stock items!'));
        }
        connection.end();
    });
};

var addToInventory = function() {
    askForID();
};

var addNewProduct = function() {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'Enter the product name:'
        },
        {
            name: 'department',
            type: 'input',
            message: 'Enter the product department:'
        },
        {
            name: 'price',
            type: 'input',
            message: 'Enter the product price:',
            validate: (value) => {
                if (!isNaN(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        }, 
        {
            name: 'stockNum',
            type: 'input',
            message: 'Enter the number of items in stock:',
            validate: (value) => {
                if (!isNaN(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]).then((answers) => {
        connection.query('INSERT INTO products SET ?', {
            product_name: answers.name,
            department_name: answers.department,
            price: answers.price,
            stock_quantity: answers.stockNum
        }, (err, res) => {
            if (err) throw err;
            console.log('Item successfully added!');
            connection.end();
        });
    });
};

var deleteProduct = function() {
    inquirer.prompt({
        name: 'itemID',
        type: 'input',
        message: 'Enter the ID of the product you\'d like to remove:'
    }).then((answer) => {
        connection.query('SELECT * FROM products WHERE ?', { item_id: answer.itemID }, (err, res) => {
            inquirer.prompt({
                name: 'confirm',
                type: 'confirm',
                message: `You would like to delete` + chalk.blue.bold(` '${res[0].product_name}'. `) + `Is this correct?`
            }).then((answer) => {
                if (answer.confirm) {
                    itemToDelete.push(res);
                    connection.query('DELETE FROM products WHERE ?', { item_id: itemToDelete[0][0].item_id }, (err, res) => {
                        if (err) throw err;
                        console.log('Item successfully removed!');
                        connection.end();
                    });
                } else {
                    deleteProduct();
                }
            });
        });
    });
};

var askForID = function() {
    inquirer.prompt({
        name: 'itemID',
        type: 'input',
        message: 'Enter the ID of the item you\'d like to update:',
        // validate input is number from 1-10
        validate: (value) => {
            if (!isNaN(value) && (value > 0 && value <= 10)) {
                return true;
            } else {
                console.log(chalk.red(' => Please enter a number from 1-10'));
                return false;
            }
        }
        // select all rows where ID = user's input
    }).then((answer) => {
        connection.query('SELECT * FROM products WHERE ?', { item_id: answer.itemID }, (err, res) => {
            confirmItem(res[0].product_name, res);
        });
    });
};

var confirmItem = function(product, object) {
    inquirer.prompt({
        name: 'confirmItem',
        type: 'confirm',
        message: `You chose` + chalk.blue.bold(` '${product}'. `) + `Is this correct?`
    }).then((answer) => {
        if (answer.confirmItem) {
            itemToUpdate.push(object);
            askHowMany();
        } else {
            askForID();
        }
    });
};

var askHowMany = function() {
    inquirer.prompt({
        name: 'howMany',
        type: 'input',
        message: 'Enter the quantity you would like to add:',
        validate: (value) => {
            if (!isNaN(value) && value > 0) {
                return true;
            } else {
                console.log(chalk.red(' => Oops, please enter a number greater than 0'));
                return false;
            }
        }
    }).then((answer) => {
        itemToUpdate.push(answer.howMany);
        connection.query('UPDATE products SET ? WHERE ?', [
            {
                stock_quantity: Number(itemToUpdate[0][0].stock_quantity) + Number(answer.howMany)
            },
            {
                item_id: itemToUpdate[0][0].item_id
            }
        ], (err, res) => {
            console.log(chalk.blue.bold(`Inventory updated! Item ${itemToUpdate[0][0].item_id} now has ${Number(itemToUpdate[0][0].stock_quantity) + Number(itemToUpdate[1])} items in stock`));
            connection.end();
        });
    });
}
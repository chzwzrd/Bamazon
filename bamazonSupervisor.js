// SETUP
// =====================================================================================
var mysql = require('mysql');
var inquirer = require('inquirer');
var chalk = require('chalk');
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: '',
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connection successful');
    resetData();
    // display all items from database once mysql connection has been established
    displayMenu();
});

// GLOBAL VARIABLES
// =====================================================================================
var deptToDelete = [];

// FUNCTIONS
// =====================================================================================
var resetData = function() {
    deptToDelete = [];
};

var displayMenu = function() {
    inquirer.prompt({
        name: 'action',
        type: 'rawlist',
        message: 'Choose an action:',
        choices: [
            'View Departments',
            'View Product Sales by Department',
            'Create New Department',
            'Delete A Department'
        ]
    }).then((answer) => {
        switch (answer.action) {
            case 'View Departments':
                viewDepartments();
                break;
            case 'View Products Sales by Department':
                viewDepartmentSales();
                break;
            case 'Create New Department':
                createDepartment();
                break;
            case 'Delete A Department':
                deleteDepartment();
                break;
        }
    });
};

var viewDepartments = function() {
    connection.query('SELECT * FROM departments', (err, res) => {
        var listTable = new Table({
            head: ['Dept ID', 'Dept Name', 'Overhead'],
            colWidths: [10, 25, 12]
        });

        for (var i = 0; i < res.length; i++) {
            listTable.push([res[i].department_id, res[i].department_name, `$${res[i].over_head_costs}`])
            // console.log(chalk.blue.bold(`\n\tDept ID: ${res[i].department_id}\n\tDept Name: ${res[i].department_name}\n\tOverhead Costs: $${res[i].over_head_costs}\n`));
        }

        console.log(`\n\n${listTable.toString()}\n\n`);
        connection.end();
    });
};

var viewDepartmentSales = function() {
    connection.query(`SELECT * FROM products`, (err, res) => {
        for (var i = 0; i < res.length; i++) {
            console.log(chalk.blue.bold(`\n\tItem ID: ${res[i].item_id}\n\tProduct Name: ${res[i].product_name}\n\tPrice: $${res[i].price}\n`));
        }
        connection.end();
    });
};

var createDepartment = function() {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'Enter the department name:'
        },
        {
            name: 'overhead',
            type: 'input',
            message: 'Enter the overhead costs for this department:',
            validate: (value) => {
                if (!isNaN(value) && value > 0) {
                    return true;
                } else {
                    console.log(chalk.red(' => Oops, please enter a number greater than 0'));
                    return false;
                }
            }
        },
    ]).then((answers) => {
        connection.query('INSERT INTO departments SET ?', {
            department_name: answers.name,
            over_head_costs: answers.overhead
        }, (err, res) => {
            if (err) throw err;
            console.log(chalk.blue.bold('\n\tDepartment successfully added!\n'));
            connection.end();
        });
    });
};

var deleteDepartment = function() {
    inquirer.prompt({
        name: 'deptID',
        type: 'input',
        message: 'Enter the ID of the department you\'d like to remove:'
    }).then((answer) => {
        connection.query('SELECT * FROM departments WHERE ?', { department_id: answer.deptID }, (err, res) => {
            inquirer.prompt({
                name: 'confirm',
                type: 'confirm',
                message: `You would like to delete` + chalk.blue.bold(` '${res[0].department_name}'. `) + `Is this correct?`
            }).then((answer) => {
                if (answer.confirm) {
                    deptToDelete.push(res);
                    connection.query('DELETE FROM departments WHERE ?', { department_id: deptToDelete[0][0].department_id }, (err, res) => {
                        if (err) throw err;
                        console.log(chalk.blue.bold('\n\tDepartment successfully deleted!\n'));
                        connection.end();
                    });
                } else {
                    deleteDepartment();
                }
            });
        });
    });
};
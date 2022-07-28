const inquirer = require('inquirer');
const viewDepartments = require('../cli/viewAllDepartments');
const viewEmployees = require('./viewAllEmployees');
const viewRoles = require('./viewAllRoles');

const promptUser =()=>{
    return inquirer.prompt([
        {
            type:'list',
            name:'employee_select',
            message:'What would you like to do?',
            choices:['View All Employees', 'Add Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
        }
    ])
    .then(({employee_select})=>{
        switch(employee_select){
            case 'View All Employees':
                return viewEmployees();
                break;
            case 'Add Employee Role':
                break;
            case 'View All Roles':
                return viewRoles();
                break;
            case 'Add Roles':
                break;
            case 'View All Departments':
                return viewDepartments();
                break;
            case 'Add Department':
                break;
            case 'Quit':
                break;
        }
    });
};


promptUser();
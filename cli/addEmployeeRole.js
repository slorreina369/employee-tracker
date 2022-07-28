const inquirer = require('inquirer');
const fetch = require('node-fetch');

const employeePrompt =() =>{
    return Promise.all([
        fetch('http://localhost:3001/api/roles').then((response) => response.json()),
        fetch('http://localhost:3001/api/employees').then((response) => response.json())
    ])
    .then(([rolesData, employeesData]) =>{
        return inquirer.prompt([
            {
                type:'input',
                name:'first_name',
                message:"What is the employee's first name?"
            },
            {
                type:'input',
                name:'last_name',
                message:"What is the employee's last name?"
            },
            {
                type:'list',
                name:'role_id',
                message:"what is the employee's role?",
                choices:rolesData.data.map(role => ({name:role.title, value:role.id}))
            },
            {
                type:'list',
                name:'manager_id',
                message:"Who is the employee's manager?",
                choices:employeesData.data.filter(employee =>{
                    return employee.title.includes('Lead') || employee.title.includes('Manager')
                })
                    .map(employee =>({name:employee.first_name + ' ' + employee.last_name, value:employee.id}))
            }
        ])
    })
    .then((employee =>{
        return fetch('http://localhost:3001/api/employees', {
            method:'post',
            body:JSON.stringify(employee),
            headers:{'Content-Type':'application/json'}
        })
        .then((response) =>{
            return response.json()
            .then(console.log)
        })
    }));
};

module.exports = employeePrompt;
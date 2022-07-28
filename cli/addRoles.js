const inquirer = require('inquirer');
const fetch = require('node-fetch');

const rolesPrompt =()=>{
    console.log("beep beep")
    return fetch('http://localhost:3001/api/departments')
    .then((response) => response.json())
    .then(({data}) => {
        console.log('Data')
        return inquirer.prompt([
            {
                type:'input',
                name:'title',
                message:'What is the name of the role?'
            },
            {
                type:'input',
                name:'salary',
                message:'What is the salary of the role?'
            },
            {
                type:'list',
                name:'department_id',
                message:'Which department does the role belong to?',
                choices:data.map(department =>({name:department.name, value:department.id}))
            }
        ])
    })
    .then(role => {
        return fetch('http://localhost:3001/api/roles', {
            method:'post',
            body:JSON.stringify(role),
            headers:{'Content-Type':'application/json'}
        })
        .then((response) =>{
            return response.json()
            .then(console.log)
        })
    });
};

module.exports = rolesPrompt;
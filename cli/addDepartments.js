const inquirer = require('inquirer');
const fetch = require('node-fetch');

const departmentPrompt = () => {
    return inquirer.prompt([
        {
            type:'input',
            name:'name',
            message:'What is the name of your department?',
            validate: nameInput => {
                if(nameInput){
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        }
    ])
    .then(department => {
        return fetch('http://localhost:3001/api/departments', {
            method: 'post',
            body: JSON.stringify(department),
            headers: {'Content-Type': 'application/json'}
        })
        .then((response)=>{
            return response.json();
        })
        .then(console.log);
    })
};

module.exports = departmentPrompt;
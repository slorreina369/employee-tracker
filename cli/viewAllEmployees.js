const AsciiTable = require("ascii-table/ascii-table");
const fetch = require('node-fetch');

const viewEmployees =()=>{
    return fetch ('http://localhost:3001/api/employees')
    .then((response) => response.json())
    .then(response =>{
        const table = AsciiTable.factory({
            heading:['id', 'first_name','last_name', 'title', 'department', 'manager'],
            rows: response.data.map(employee =>
                [
                    employee.id,
                    employee.first_name,
                    employee.last_name,
                    employee.title,
                    employee.department,
                    employee.manager
                ]
            )
        });
        console.log(table.toString());
    });
}

module.exports = viewEmployees;
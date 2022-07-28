const AsciiTable = require("ascii-table/ascii-table");
const fetch = require('node-fetch');

const viewRoles = ()=>{
    return fetch('http://localhost:3001/api/roles')
    .then((response) => response.json())
    .then(response =>{
        const table = AsciiTable.factory({
            heading:['id','title','salary','department'],
            rows: response.data.map(role =>
                [
                    role.id,
                    role.title,
                    role.salary,
                    role.department
                ]
            )
        });
        console.log(table.toString());
    })
}

module.exports = viewRoles;
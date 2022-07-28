const AsciiTable = require("ascii-table/ascii-table");
const fetch = require('node-fetch');

const viewDepartments =()=>{
    return fetch('http://localhost:3001/api/departments')
    .then((response) => response.json())
    .then(response =>{
        const table = AsciiTable.factory({
            heading:['id', 'name'],
            rows: response.data.map(department =>
                [
                    department.id,
                    department.name
                ]
            )
        });

        console.log(table.toString());
    })
}

module.exports = viewDepartments;
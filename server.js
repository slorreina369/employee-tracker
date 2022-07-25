const express = require('express');
//const db = require('./db/connection');
//const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});
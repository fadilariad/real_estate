const express = require('express');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const app = express();
const port = process.env.PORT || 5000;
const routes = require('./routes/index');
const init = require('./bootstrap/init');


const server = app.listen(port, () => {
    routes(app);
    console.log(`server listen to port ${port}`)
});
init(app,express,bodyParser,cookie);
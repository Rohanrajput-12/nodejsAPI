const express = require('express')
const app = express()
bodyParser = require('body-parser');
app.use('/user_img',express.static(__dirname+'/user_img'));

app.use(bodyParser.urlencoded({ extended: true }));

// Configuring the database
const dbConfig = require('./config/db_connect.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

var routes = require('./api/route.js');
routes(app);



app.listen(8080,()=>console.log("listining on 8080"));
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'client', 'views'));

// Application's routes
app.get('/',(req, res) =>{
    res.render('layouts/accueil');
})

module.exports = app;
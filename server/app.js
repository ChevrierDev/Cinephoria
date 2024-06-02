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
    res.redirect('/accueil');
});

app.get('/accueil',(req, res) =>{
    res.render('layouts/accueil', {
        title: 'bienvenue à Cinéphoria.'
    });
});

app.get('/reservation',(req, res) =>{
    res.render('layouts/reservation', {
        title: "Réserver un film."
    });
});

app.get('/contact',(req, res) =>{
    res.render('layouts/contact', {
        title: "Contactez-nous."
    });
});

app.get('/login',(req, res) =>{
    res.render('auth/login', {
        title: "Connectez-vous à votre compte."
    });
});

//form components routes 
app.get('/components/login-form.ejs', (req, res) => {
    res.render('components/login-form');
});

app.get('/components/register-form.ejs', (req, res) => {
    res.render('components/register-form');
});

module.exports = app;
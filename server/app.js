const express = require('express');
const morgan = require('morgan');
const path = require('path');
const accueilRoutes = require('./routes/accueil/accueil.routes');
const filmsRoutes = require('./routes/films/films.routes');
const reservationRoutes = require('./routes//reservation/reservation.routes');
const contactRoutes = require('./routes/contact/contact.routes');
const loginFormRoutes = require('./routes/components/login-form.routes');
const registerFormRoutes = require('./routes/components/register-form.routes');

const app = express();
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'client', 'views'));

// Application's routes
app.get('/',(req, res) =>{
    res.redirect('/accueil');
});
app.use('/accueil', accueilRoutes);
app.use('/films', filmsRoutes);
app.use('/reservation', reservationRoutes);
app.use('/contact', contactRoutes);

//login route 
app.get('/login',(req, res) =>{
    res.render('auth/login', {
        title: "Connectez-vous à votre compte."
    });
});

//form components routes 
app.use('/', loginFormRoutes);
app.use('/', registerFormRoutes);

module.exports = app;
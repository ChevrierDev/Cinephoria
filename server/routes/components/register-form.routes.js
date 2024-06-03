const express = require('express');
const registerFormRoutes = express.Router();

registerFormRoutes.get('/components/register-form.ejs', (req, res) => {
    res.render('components/register-form');
});

module.exports = registerFormRoutes
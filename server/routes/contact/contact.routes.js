const express = require('express');
const contactRoutes = express.Router();

contactRoutes.get('/',(req, res) =>{
    res.render('layouts/contact', {
        title: "Contactez-nous."
    });
});

module.exports = contactRoutes
const express = require('express');
const userDashRoutes = express.Router();

userDashRoutes.get('/user/reset-pass',(req, res) =>{
    res.render('dashboard/users/userResetPass', {
        title: 'Réinitialiser votre mot de passe..'
    });
});

module.exports = userDashRoutes
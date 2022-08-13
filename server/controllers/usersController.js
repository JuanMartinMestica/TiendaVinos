const express = require('express')
const router = express.Router()
const passport = require('passport')

//MIDDLEWARE FUNCTIONS

const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/auth')
}


const checkNotAuthenticated = (req, res, next) => {

    if (req.isAuthenticated()) {
        return res.redirect('/auth/profile')
    } else {
        return next()
    }
}


// ============================ LOGIN ROUTES ============================

router.get('/', checkNotAuthenticated, async(req, res) => {
    res.render('signin')
})

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/auth/profile',
    failureRedirect: '/auth/',
    failureFlash: 'true'
}))


// =========================== REGISTER ROUTES ======================

router.get('/registro', async(req, res) => {
    res.render('signup')
})

router.post('/registro', passport.authenticate('local-register', {
    successRedirect: '/auth',
    failureRedirect: '/auth/registro',
    failureFlash: 'true'
}));

// =========================== PROFILE ROUTES ======================

router.get('/profile', checkAuthenticated, async(req, res) => {
    res.render('profile', { user: req.user.rows[0] })
})

router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/auth');
    });

})



module.exports = { router: router }

// checkAuth: checkAuthenticated, checkNotAuth: checkNotAuthenticated
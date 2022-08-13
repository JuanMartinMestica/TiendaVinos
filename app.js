//Setting up express server
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')

require('dotenv').config()
require('./server/controllers/Passport/Local-auth')

//for post method
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//project static folder
app.use(express.static('public'));

//ejs layouts
app.use(expressLayouts);
app.set('layout', './layouts/home');
app.set('view engine', 'ejs');

//Setting sessions and passport
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(function(req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

//express router
const routes = require('./server/routes/router.js');
app.use('/', routes);

//listen port
app.listen(port, () => { console.log(`Running on port ${port}`); });
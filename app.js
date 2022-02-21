const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
const authRouter = require('./routers/auth_router');


mongoose.connect('mongodb://localhost:27017/user_login', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(_ => console.log('Database connection'))
    .catch(err => console.log('Database connection error' + err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(session(
    {
        secret: 'test',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        },
        // store: sessionStore
    }
));

app.use(session());
app.use(flash());

app.use((req, res, next) => {
    res.locals.validate_errors = req.flash('validation_error');
    res.locals.success_message = req.flash('success_message');
    res.locals.ad = req.flash('ad');
    res.locals.soyad = req.flash('soyad');
    res.locals.email = req.flash('email');
    res.locals.sifre = req.flash('sifre');
    res.locals.reSifre = req.flash('reSifre');
    res.locals.login_errors = req.flash('error');
    next();
});

app.use('/', authRouter);

app.use('/', (req, res, next) => {
    res.send('First Request');
});


app.listen(3000, () => {
    console.log('App listening from 3000 port');
});
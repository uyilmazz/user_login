const User = require("../models/user");
const { validationResult } = require('express-validator');
const session = require('express-session');

const getLogin = (req, res, next) => {
    res.render('login', { layout: 'layout/auth_layout.ejs', title: 'Login' });
}

const postLogin = async (req, res, next) => {
    const errorArray = validationResult(req);
    if (!errorArray.isEmpty()) {
        req.flash('validation_error', errorArray.array());
        req.flash('email', req.body.email);
        req.flash('sifre', req.body.sifre);
        res.redirect('/login');
    } else {
        try {
            const _user = await User.findOne({ email: req.body.email, sifre: req.body.sifre });
            if (!_user) {
                req.flash('validation_error', [{ msg: 'Email veya Şifre yanlış!' }]);
                req.flash('email', req.body.email);
                req.flash('sifre', req.body.sifre);

                res.redirect('/login');
            }
            else {
                req.flash('success_message', [{ msg: 'Kullanıcı başarıyla giriş yaptı.' }]);
                req.session.userID = _user._id;
                // res.redirect('/login');
                res.send({
                    page: 'Dashboard',
                    user: _user
                });
            }

        } catch (err) {
            console.log('error :' + err);
        }
    }
}

const getRegister = (req, res, next) => {
    res.render('register', { layout: 'layout/auth_layout.ejs', title: 'register' });
}

const postRegister = async (req, res, next) => {
    const errorArray = validationResult(req);
    if (!errorArray.isEmpty()) {
        console.log(errorArray);
        req.flash('validation_error', errorArray.array());
        req.flash('ad', req.body.ad);
        req.flash('soyad', req.body.soyad);
        req.flash('email', req.body.email);
        req.flash('sifre', req.body.sifre);
        req.flash('reSifre', req.body.reSifre);
        res.redirect('/register');
    } else {
        try {
            const ad = req.body.ad;
            const soyad = req.body.soyad;
            const email = req.body.email;
            const sifre = req.body.sifre;
            const reSifre = req.body.sifre;

            const _user = await User.findOne({ email: email });

            if (_user) {
                req.flash('validation_error', [{ msg: 'Bu mail zaten kayıtlı!' }]);
                req.flash('ad', ad);
                req.flash('soyad', soyad);
                req.flash('email', email);
                req.flash('sifre', sifre);
                req.flash('reSifre', reSifre);
                res.redirect('/register');
            } else {
                const _newUser = new User({
                    ad: ad,
                    soyad: soyad,
                    email: email,
                    sifre: sifre,

                });

                const _result = await _newUser.save();
                if (_result) {
                    req.flash('success_message', [{ msg: 'Kayıt işlemi başırılı' }]);
                }
                res.redirect('/login');
            }

        } catch (err) {
            console.log(err);
        }
    }

}


module.exports = {
    getLogin,
    postLogin,
    getRegister,
    postRegister
}
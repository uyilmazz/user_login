const { body } = require('express-validator');


const registerValidate = () => {

    return [
        body('ad').trim().isLength({ min: 2 }).withMessage('İsim en az 3 karakter olmalıdır.'),
        body('soyad').trim().isLength({ min: 2 }).withMessage('Soyisim en az 3 karakter olmalıdır.'),
        body('email').trim().isEmail().withMessage('Email uygun formatta değil!'),
        body('sifre').trim().isLength({ min: 2 }).withMessage('Şifre en az 2 karater olmalıdır.'),
        body('reSifre').trim().custom((value, { req }) => {
            if (value !== req.body.sifre) {
                throw new Error('Şifreler aynı değil!');
            }
            return true;
        })
    ]
}

const loginValidate = () => {

    return [
        body('email').trim().isEmail().withMessage('Email uygun formatta değil!'),
        body('sifre').trim().isLength({ min: 2 }).withMessage('Şifre en az 2 karater olmalıdır.'),
    ]
}

module.exports = {
    registerValidate,
    loginValidate
}
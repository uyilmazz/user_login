
const User = require('../models/user');

const signInControl = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userID);
        if (user) {
            next();
        } else {
            res.redirect('/login');
        }

    } catch (err) {
        res.send({
            error: err
        });
    }
}

const signOutControl = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userID);
        if (!user) {
            next();
        } else {
            res.redirect('/');
        }

    } catch (err) {
        res.send({
            error: err
        });
    }
}

module.exports = {
    signInControl,
    signOutControl,
}
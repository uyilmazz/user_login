const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    ad: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    },
    soyad: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    sifre: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
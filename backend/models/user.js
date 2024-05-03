const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    refreshToken: {
        type: String,
        default: null
    },

    salt:{
        type: String,
        default: null
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) 
    return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        this.salt = salt;
        next();
    } catch (error) {
        next(error);
    }
});


userSchema.methods.generateAccessToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
     return token;
};

userSchema.methods.generateRefreshToken = async function () {
    const refToken = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1week' });
    this.refreshToken = refToken;
    await this.save();
    return refToken;
};

const User = mongoose.model('User', userSchema);


module.exports = User;
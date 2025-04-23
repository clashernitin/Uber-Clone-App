const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3,'First name must be at least 3 characters long'],
        },
        lastName: {
            type: String,
            required: true,
            minlength: [3,'Last name must be at least 3 characters long'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        Select: false,
    },
    socketId: {
        type: String,
    },
});

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {expiresIn: '24h'} );
    return token;
};

userSchema.methods.comparePassword = async function(password) {
    const user = this;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
};

userSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName:{
            type: String,
            required: true,
            minlength: [4, 'Full name must be at least 4 characters long'],
        },
        lastName:{
            type: String,
            required: true,
            minlength: [4, 'Full name must be at least 4 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
    status: { 
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle:{
        color:{
            type: String,
            required: true,
        },
        plate:{
            type: String,
            required: true,
        },
        capacity:{
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto'],
        },
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        },
    }
})

captainSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}
captainSchema.methods.comparePassword = async function(password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}
captainSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;


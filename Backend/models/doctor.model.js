const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const doctorSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long']
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long']
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    specialty: {
        type: String,
        required: true,
        minlength: [3, 'Specialty must be at least 3 characters long']
    },
    licenseNumber: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: [10, 'Phone number must be at least 10 characters long']
    },
    socketId: {
        type: String,
    }
});

doctorSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}
doctorSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
doctorSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const doctorModel = mongoose.model('doctor', doctorSchema);

module.exports = doctorModel;
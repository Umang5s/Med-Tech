const { validationResult } = require('express-validator');
const doctorModel = require('../models/doctor.model');
const doctorService = require('../services/doctor.service');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerDoctor = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, specialty, licenseNumber, phoneNumber } = req.body;

    const isDoctorAlreadyExist = await doctorModel.findOne({ email });

    if (isDoctorAlreadyExist) {
        return res.status(400).json({ message: 'Doctor already exists' });
    }

    const hashedPassword = await doctorModel.hashPassword(password);

    const doctor = await doctorService.createDoctor({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        specialty,
        licenseNumber,
        phoneNumber
    });

    const token = doctor.generateAuthToken();

    res.status(201).json({ token, doctor });
}

module.exports.loginDoctor = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email }).select('+password');

    if (!doctor) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await doctor.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = doctor.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, doctor });
}

module.exports.getDoctorProfile = async (req, res, next) => {
    res.status(200).json({ doctor: req.doctor });
}

module.exports.logoutDoctor = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blacklistTokenModel.create({ token });

    res.clearCookie('token');

    res.status(200).json({ message: 'Logout successfully' });
}
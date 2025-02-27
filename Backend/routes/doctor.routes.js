const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const doctorController = require('../controllers/doctor.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('specialty').isLength({ min: 3 }).withMessage('Specialty must be at least 3 characters long'),
    body('licenseNumber').isLength({ min: 3 }).withMessage('License number must be at least 3 characters long'),
    body('phoneNumber').isLength({ min: 10 }).withMessage('Phone number must be at least 10 characters long'),
], doctorController.registerDoctor);

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], doctorController.loginDoctor);

router.get('/profile', authMiddleware.authDoctor, doctorController.getDoctorProfile);

router.get('/logout', authMiddleware.authDoctor, doctorController.logoutDoctor);

module.exports = router;
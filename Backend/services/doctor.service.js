const doctorModel = require('../models/doctor.model');

module.exports.createDoctor = async ({
    firstname, lastname, email, password, specialty, licenseNumber, phoneNumber
}) => {
    if (!firstname || !lastname || !email || !password || !specialty || !licenseNumber || !phoneNumber) {
        throw new Error('All fields are required');
    }
    const doctor = new doctorModel({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        specialty,
        licenseNumber,
        phoneNumber
    });
    await doctor.save(); // Save the doctor to the database
    return doctor;
}
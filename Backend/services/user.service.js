const userModel = require('../models/user.model');

module.exports.createUser = async ({
    firstname, lastname, email, password
}) => {
    // if (!firstname || !email || !password) {
    //     throw new Error('all fields are required')
    // }
    if (!firstname) {
        throw new Error('firstname not given');
    }
    if (!email) {
        throw new Error('email not given');
    }
    if (!password) {
        throw new Error('password not given');
    }
    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}
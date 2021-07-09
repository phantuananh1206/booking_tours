require('dotenv').config();
const sendMail = require('../mailers/mail');
const jwt = require('jsonwebtoken');

const sendConfirmationEmail = function (email, User) {
    const token = jwt.sign({ email }, process.env.JWT_EMAIL_ACTIVATE, {
        expiresIn: '1d',
    });
    User.updateOne({ email }, { activation_digest: token }).exec((err, res) => {
        if (err) throw err;
    });
    sendMail(
        'phantuananhltt@gmail.com',
        'Confirm email',
        'Please Confirm your email!',
        `<h2>Please click on given link to activate your account</h2>
        <p>${process.env.CLIENT_URL}/user/confirmation/${token}</p>`,
        function (error, info) {
            if (error) {
                res.status(500).json({
                    error: 'Error' + error.message,
                });
            } else {
                res.json({ message: 'Email has been sent!!!' });
            }
        },
    );
};

module.exports = sendConfirmationEmail;

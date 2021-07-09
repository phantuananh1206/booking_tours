require('dotenv').config();
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

// Config SMTP transport - send email
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

transporter.use(
    'compile',
    hbs({
        viewEngine: 'express-handlebars',
        viewPath: './views/',
    }),
);

const sendMail = (email, subject, text, html, callback) => {
    var mailOptions = {
        from: 'phantuananhltt@gmail.com',
        to: email,
        subject: subject,
        text: text,
        html: html,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            callback(error, null);
        } else {
            callback(null, info);
        }
    });
};

module.exports = sendMail;

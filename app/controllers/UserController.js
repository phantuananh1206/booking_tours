require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendConfirmationEmail = require('../mailers/confirmation');

class UserController {
    // [POST] /sign-up
    new(req, res, next) {
        res.render('users/new');
    }

    async create(req, res, next) {
        try {
            const { name, email } = req.body;
            User.findOne({ email }).exec((error, user) => {
                if (user) {
                    return res
                        .status(400)
                        .json({ error: 'User with this email already exists' });
                }
            });

            req.body.password = await bcrypt.hash(req.body.password, 10);
            const user = new User(req.body);
            user.save()
                .then(() => {
                    sendConfirmationEmail(email, User);
                    res.redirect('/');
                })
                .catch((next) => {});
        } catch (e) {
            res.status(500).send('Something broke!');
        }
    }

    async signin(req, res, next) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                const validPassword = await bcrypt.compare(
                    req.body.password,
                    user.password,
                );
                if (validPassword) {
                    if (user.activated == true) {
                        var sess = req.session;
                        sess.isLogin = true;
                        sess.email = user.email;
                        res.status(200).redirect('/');
                    } else {
                        sendConfirmationEmail(user.email, User);
                        res.redirect('/');
                    }
                } else {
                    res.status(400).json('Invalid password!');
                }
            } else {
                res.status(404).json('User not found!');
            }
        } catch (e) {
            res.status(500).send('Something broke!');
        }
    }

    activateAccount(req, res, next) {
        const token = req.params.token;
        if (token) {
            jwt.verify(
                token,
                process.env.JWT_EMAIL_ACTIVATE,
                function (err, decodedToken) {
                    if (err) {
                        return res
                            .status(400)
                            .json({ error: 'Incorrect of Expired link.' });
                    }

                    const { email } = decodedToken;
                    User.findOne({ email }).exec((error, user) => {
                        if (user && user.activated == false) {
                            if (user.activation_digest == token) {
                                User.updateOne(
                                    { email },
                                    { activated: true },
                                ).exec((err, res) => {
                                    if (err) throw err;
                                });
                                return res.redirect('http://localhost:3000/');
                            } else {
                                res.status(400).json({
                                    error: 'Confirmation failed!!!',
                                });
                            }
                        } else {
                            res.status(400).json({
                                error: 'Email has been activated!!!',
                            });
                        }
                    });
                },
            );
        } else {
            return res.json({ error: 'Something went wrong!!!' });
        }
    }

    signout(req, res, next) {
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = new UserController();

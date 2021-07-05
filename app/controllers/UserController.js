const User = require('../models/User');
var bcrypt = require('bcryptjs');

class UserController {
    // [POST] /sign-up
    new(req, res, next) {
        res.render('users/new');
    }

    async create(req, res, next) {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const user = new User(req.body);
            user.save()
                .then(() => res.redirect('/'))
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
                    res.status(200).redirect('/');
                } else {
                }
            } else {
                res.status(404).json('Password not valid!');
                alert('User not found');
            }
        } catch (e) {
            res.status(500).send('Something broke!');
        }
    }
}

module.exports = new UserController();

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
}

module.exports = new UserController();

const Tour = require('../models/Tour');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class HomeController {
    // [GET] /
    index(req, res, next) {
        Tour.find({})
            .then((tours) => {
                res.render('home', {
                    tours: mutipleMongooseToObject(tours),
                });
            })
            .catch(next);
    }
}

module.exports = new HomeController();

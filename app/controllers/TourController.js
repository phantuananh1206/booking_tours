const Tour = require('../models/Tour');
const { mongooseToObject } = require('../../util/mongoose');

class TourController {
    // [GET] /tour/:slug
    show(req, res, next) {
        Tour.findOne({ slug: req.params.slug })
            .then((tour) => {
                res.render('partials/tours/show', {
                    tour: mongooseToObject(tour),
                });
            })
            .catch(next);
    }
}

module.exports = new TourController();

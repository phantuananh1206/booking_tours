const Booking = require('../models/Booking');
const User = require('../models/User');
const Tour = require('../models/Tour');
const { mongooseToObject } = require('../../util/mongoose');
const moment = require('moment-timezone');

class BookingController {
    // [GET] /booking/tour?:tour_id
    new(req, res, next) {
        const tour_id = req.params.id;
        const tour_price = req.query.price;
        User.findOne({ email: req.session.email })
            .then((user) => {
                res.render('partials/booking/new', {
                    user: mongooseToObject(user),
                    tour_id,
                    tour_price,
                });
            })
            .catch(next);
    }

    // [POST] /booking/create
    create(req, res, next) {
        var date_to = new Date(req.body.departure_date);
        const booking = new Booking({
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            address: req.body.address,
            requirement: req.body.requirement,
            user: req.body.user,
            tour: req.body.tour,
            booking_details: {
                departure_date: moment.tz(
                    req.body.departure_date,
                    'Asia/Ho_Chi_Minh',
                ),
                guest_number: req.body.guest_number,
                price: req.body.price,
                total: req.body.guest_number * req.body.price,
                date_from: moment.tz(
                    req.body.departure_date,
                    'Asia/Ho_Chi_Minh',
                ),
                date_to: moment.tz(
                    date_to.setDate(date_to.getDate() + 2),
                    'Asia/Ho_Chi_Minh',
                ),
            },
        });
        booking
            .save()
            .then(() => res.redirect('/'))
            .catch(next);
    }
}

module.exports = new BookingController();

class BookingController {
    // [GET] /booking/new
    new(req, res, next) {
        res.render('partials/booking/new');
    }
}

module.exports = new BookingController();

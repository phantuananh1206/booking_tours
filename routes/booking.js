var express = require('express');
var router = express.Router();

const bookingController = require('../app/controllers/BookingController');

router.get('/new', bookingController.new);

module.exports = router;

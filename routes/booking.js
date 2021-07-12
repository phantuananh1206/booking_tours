var express = require('express');
var router = express.Router();

const loginMiddleware = require('../app/middlewares/LoginMiddleware');

const bookingController = require('../app/controllers/BookingController');

router.get('/tour/:id', loginMiddleware, bookingController.new);
router.post('/create', loginMiddleware, bookingController.create);

module.exports = router;

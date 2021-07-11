var express = require('express');
var router = express.Router();
const loginMiddleware = require('../app/middlewares/LoginMiddleware');

const tourController = require('../app/controllers/TourController');

router.get('/:slug', loginMiddleware, tourController.show);

module.exports = router;

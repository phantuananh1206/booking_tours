var express = require('express');
var router = express.Router();

const tourController = require('../app/controllers/TourController');

router.get('/:slug', tourController.show);

module.exports = router;

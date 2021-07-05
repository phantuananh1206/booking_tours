var express = require('express');
var router = express.Router();

const userController = require('../app/controllers/UserController');

router.get('/sign-up', userController.new);
router.post('/sign-up', userController.create);

module.exports = router;

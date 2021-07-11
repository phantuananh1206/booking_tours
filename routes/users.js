var express = require('express');
var router = express.Router();

const userController = require('../app/controllers/UserController');

router.get('/sign-up', userController.new);
router.post('/sign-up', userController.create);
router.post('/sign-in', userController.signin);
router.get('/sign-out', userController.signout);
router.get('/confirmation/:token', userController.activateAccount);

module.exports = router;

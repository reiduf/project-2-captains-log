var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');

const mypassportCtrl = require('../controllers/mypassport')

router.get('/', ensureLoggedIn, mypassportCtrl.index)

module.exports = router;
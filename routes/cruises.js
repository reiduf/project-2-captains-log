var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');

const cruisesCtrl = require('../controllers/cruises')

router.get('/new', ensureLoggedIn, cruisesCtrl.new)
router.get('/', ensureLoggedIn, cruisesCtrl.index)

module.exports = router;
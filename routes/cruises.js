var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');

const cruisesCtrl = require('../controllers/cruises')
const logsCtrl = require('../controllers/logs')

router.get('/new', ensureLoggedIn, cruisesCtrl.new)
router.get('/', ensureLoggedIn, cruisesCtrl.index)
router.post('/', ensureLoggedIn, cruisesCtrl.create)
router.get('/:id', ensureLoggedIn, cruisesCtrl.show)
router.delete('/:id', ensureLoggedIn, cruisesCtrl.delete)
router.put('/:id', ensureLoggedIn, cruisesCtrl.update)
router.get('/:id/edit', ensureLoggedIn, cruisesCtrl.edit)
router.get('/:id/logs/new', ensureLoggedIn, logsCtrl.new)
router.get('/:cruiseId/logs/:logId', ensureLoggedIn, logsCtrl.show)
router.post('/:id/logs', ensureLoggedIn, logsCtrl.create)
router.get('/:cruiseId/logs/:logId/edit', ensureLoggedIn, logsCtrl.edit)
router.put('/:cruiseId/logs/:logId', logsCtrl.update)

module.exports = router;
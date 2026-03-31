const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flight.controller');
const { protect } = require('../middlewares/auth.middleware');
const { restrictTo } = require('../middlewares/rbac.middleware');

router.get('/', flightController.getAllFlights);
router.post('/', protect, restrictTo('admin'), flightController.createFlight);

module.exports = router;
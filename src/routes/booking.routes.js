const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.controller");
const { protect } = require("../middlewares/auth.middleware");

router.use(protect);

router.post("/", bookingController.createBooking);
router.get("/my-bookings", bookingController.getMyBookings);

module.exports = router;
const Booking = require('../models/booking.model');
const Flight = require('../models/flight.model');
const AppError = require('../utils/AppError');

exports.createBooking = async (req, res, next) => {
    try {
        const { flightId, seatClass } = req.body;

        const flight = await Flight.findById(flightId);
        if (!flight) {
            return next(new AppError('Flight not found', 404));
        }

        let seatField = 'economySeatsAvailable';
        let price = flight.economyPrice;

        if (seatClass === 'business') {
            seatField = 'businessSeatsAvailable';
            price = flight.businessPrice;
        }

        if (flight[seatField] <= 0) {
            return next(new AppError('No seats available for the selected class', 400));
        }

        const booking = await Booking.create({
            user: req.user.id,
            flight: flightId,
            seatClass: seatClass,
            totalPrice: price
        });

        flight[seatField] -= 1;
        await flight.save();

        res.status(201).json({
            status: 'success',
            data: booking
        });
    } catch (err) {
        next(err);
    }
};

exports.getMyBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate({
                path: 'flight',
                populate: { path: 'origin destination' }
            });

        res.status(200).json({
            status: 'success',
            results: bookings.length,
            data: bookings
        });
    } catch (err) {
        next(err);
    }
};
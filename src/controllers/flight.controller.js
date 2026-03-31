const Flight = require('../models/flight.model');

exports.getAllFlights = async (req, res, next) => {
    try {
        const { origin, destination } = req.query;
        let filter = {};

        if (origin) filter.origin = origin;
        if (destination) filter.destination = destination;

        const flights = await Flight.find(filter)
            .populate('origin')
            .populate('destination')
            .populate('airplane');

        res.status(200).json({ 
            status: 'success', 
            results: flights.length,
            data: flights 
        });
    } catch (err) {
        next(err);
    }
};

exports.createFlight = async (req, res, next) => {
    try {
        const newFlight = await Flight.create(req.body);
        
        res.status(201).json({ 
            status: 'success', 
            data: newFlight 
        });
    } catch (err) {
        next(err);
    }
};
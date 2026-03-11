const mongoose = require('mongoose');
const { required } = require('zod/mini');
const flightSchema = new mongoose.Schema({

    flightNumber: {
        type: String,
        required: [true, 'Flight number is required'],
        unique: true,
    },


    origin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Airport',
        required: true,
    },


    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Airport',
        required: true,
    },


    airplane: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Airplane',
        required: true,
    },


    departureTime: {
        type: Date,
        required: true,
    },


    arrivalTime: {
        type: Date,
        required: true,
    },


    economyPrice: {
        type: Number,
        required: true,
    },


    businessPrice: {
        type: Number,
        required: true,
    },


    economySeatsAvailable: {
        type: Number,
        required: true,
    },


    businessSeatsAvailable: {
        type: Number,
        required: true,
    },


    status: {
        type: String,
        enum: ['Scheduled', 'On Time', 'Delayed', 'Completed', 'Cancelled'],
        default: 'Scheduled',
    },


}, { timestamps: true });
module.exports = mongoose.model('Flight', flightSchema);

const mongoose = require('mongoose');

const airplaneSchema = new mongoose.Schema({
    model: { type: String, required: true },
    economySeats: { type: Number, required: true },
    businessSeats: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.models.Airplane || mongoose.model('Airplane', airplaneSchema);
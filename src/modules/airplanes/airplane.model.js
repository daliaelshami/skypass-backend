const mongoose = require('mongoose');

const airplaneSchema = new mongoose.Schema({
  model: {
    type: String,
    required: [true, 'Model is required'],
    trim: true,
  },
  economySeats: {
    type: Number,
    required: [true, 'Economy seats is required'],
    min: 0
  },
  businessSeats: {
    type: Number,
    required: [true, 'Business seats is required'],
    min: 0
  },
}, { timestamps: true });

module.exports = mongoose.model('Airplane', airplaneSchema);

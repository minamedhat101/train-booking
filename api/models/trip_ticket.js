const mongoose = require('mongoose');

const TripSchema = mongoose.Schema({
  
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
})

module.exports = mongoose.model('Trip', TripSchema);
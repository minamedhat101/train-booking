const mongoose = require('mongoose');

const TripSchema = mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  ticketType: { type: mongoose.Schema.Types.ObjectId, ref: 'TicketType' }
})

module.exports = mongoose.model('Trip', TripSchema);
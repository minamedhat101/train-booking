const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
  seat: { type: mongoose.Schema.Types.ObjectId, ref: 'Seat' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
  createdAt: {
    type: Date,
    defalut: Date.now
  },
})


module.exports = mongoose.model('Ticket', TicketSchema);
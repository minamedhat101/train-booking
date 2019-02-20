const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
  price: {
    type: Number,
    required: true
  },
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
  classType: {
    type: Number,
    enum: [1, 2]
  },
  ticketType: { type: mongoose.Schema.Types.ObjectId, ref: 'TicketType' },
})

module.exports = mongoose.model('Ticket', TicketSchema);
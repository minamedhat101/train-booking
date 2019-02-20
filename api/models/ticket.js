const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
  price: {
    type: Number,
    required: true
  },
  classType: {
    type: Number,
    enum: [1, 2]
  },
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
  ticketType: { type: mongoose.Schema.Types.ObjectId, ref: 'TicketType' },
})

module.exports = mongoose.model('Ticket', TicketSchema);
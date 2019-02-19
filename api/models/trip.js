const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
  station: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
  status: {
    type: Boolean,
    required: true
  },
  sort: {
    type: Number,
    required: true
  }
})


module.exports = mongoose.model('Ticket', TicketSchema);
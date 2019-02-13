const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
  price: {
    type: Number,
    required: true
  },
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassType' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassType' },
  startTime: {
    type: Date,
    required: true
  },
  arrivelTime: {
    type: Date,
    required: true
  },
  classType: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassType' },
  ticketType: { type: mongoose.Schema.Types.ObjectId, ref: 'TicketType' }
})


module.exports = mongoose.model('Ticket', TicketSchema);
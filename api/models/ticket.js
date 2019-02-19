const mongoose = require('mongoose');

const SeatsSchema = mongoose.Schema({
  price: {
    type: Number,
    required: true
  },
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
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


module.exports = mongoose.model('Ticket', SeatsSchema);
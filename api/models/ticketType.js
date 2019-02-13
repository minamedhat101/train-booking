const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  name: {
    type: String
  }
})

module.exports = mongoose.model('Train', TicketSchema);
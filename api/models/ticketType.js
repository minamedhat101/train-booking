const mongoose = require('mongoose');

const TicketTypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
})

module.exports = mongoose.model('TicketType', TicketTypeSchema);
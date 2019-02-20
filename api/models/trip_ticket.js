const mongoose = require('mongoose');

const Trip_TicketSchema = mongoose.Schema({
  
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
})

module.exports = mongoose.model('Trip_Ticket', Trip_TicketSchema);
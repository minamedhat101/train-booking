const mongoose = require('mongoose');
const uuid = require('uuid/v1');


const ReservationSchema = mongoose.Schema({
  singleTrip: { type: mongoose.Schema.Types.ObjectId, ref: 'SingleTrip' },
  seat: { type: mongoose.Schema.Types.ObjectId, ref: 'Seat' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: {
    type: Date,
    defalut: Date.now
  },
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
  qrCode: {
    type: String,
    defalut: uuid().split('-').join('')
  },
  valid: {
    type: Boolean,
    defalut: false
  }
})

module.exports = mongoose.model('Reservation', ReservationSchema);
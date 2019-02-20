const mongoose = require('mongoose');

const ReservationSchema = mongoose.Schema({
  singleTrip: { type: mongoose.Schema.Types.ObjectId, ref: 'SingleTrip' },
  seat: { type: mongoose.Schema.Types.ObjectId, ref: 'Seat' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: {
    type: Date,
    defalut: Date.now
  },
})

module.exports = mongoose.model('Reservation', ReservationSchema);
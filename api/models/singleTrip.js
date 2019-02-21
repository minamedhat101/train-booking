const mongoose = require('mongoose');

const SingleTripSchema = mongoose.Schema({
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
  station: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
  status: {
    type: Boolean,
    default: false
  },
  sort: {
    type: Number,
    required: true
  }
})


module.exports = mongoose.model('SingleTrip', SingleTripSchema);
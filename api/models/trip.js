const mongoose = require('mongoose');

const TripSchema = mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  arrivelTime: {
    type: Date,
    required: true
  },
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
})

module.exports = mongoose.model('Trip', TripSchema);
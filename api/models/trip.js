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
  },
  arrived: {
    type: Boolean,
    default: false
  },
  train: { type: mongoose.Schema.Types.ObjectId, ref: 'Train' },
})

module.exports = mongoose.model('Trip', TripSchema);
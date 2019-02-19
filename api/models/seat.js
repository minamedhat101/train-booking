const mongoose = require('mongoose');

const SeatsSchema = mongoose.Schema({
  classType: {
    type: Number,
    enum: [1, 2]
  },
  train: { type: mongoose.Schema.Types.ObjectId, ref: 'Train' },
  number: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  }
})


module.exports = mongoose.model('Seat', SeatsSchema);
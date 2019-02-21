const mongoose = require('mongoose');

const TrainSchema = mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  name: {
    type: String
  },
  status: {
    type: Boolean,
    default: true
  },
  days: {
    type: [String]
  }
})

module.exports = mongoose.model('Train', TrainSchema);
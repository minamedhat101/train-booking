const mongoose = require('mongoose');

const SeatsSchema = mongoose.Schema({
 
  classType: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassType' },
  train: { type: mongoose.Schema.Types.ObjectId, ref: 'Train' },
  
  number: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
})


module.exports = mongoose.model('Seat', SeatsSchema);
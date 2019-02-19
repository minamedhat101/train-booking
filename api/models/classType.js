const mongoose = require('mongoose');

const ClassTypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
})

module.exports = mongoose.model('ClassType', ClassTypeSchema);
const mongoose = require('mongoose');

const Employee_TripSchema = mongoose.Schema({

    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },

})

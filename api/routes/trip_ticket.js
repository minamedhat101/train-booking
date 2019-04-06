const express = require('express');

const router = express.Router();

const trip_ticket = require('../models/trip_ticket');

router.post('/', async (req, res) => {
  try {
    const trip = new trip_ticket({
      trip: req.body.trip,
      ticket: req.body.ticket,
    });
    let result = await trip.save();
    console.log(result);
    res.status(201).json({
      message: 'Handling POST requests to /trip',
      trip: result
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});
router.get('/', async (req, res) => {
  try {
    let trip_ticket = await trip_ticket.find()
      .populate('trip')
      .populate('ticket')
      .exec();
    if (trip_ticket) {
      return res.status(200).json({ result: trip_ticket })
    } else {
      res.status(404).json({ message: "No valid entry found for provided ID" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
})

module.exports = router;
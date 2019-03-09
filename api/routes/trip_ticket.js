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

module.exports = router;
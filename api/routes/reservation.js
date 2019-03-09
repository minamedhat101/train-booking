const express = require('express');
const role = require('../middleware/authorize');

const router = express.Router();


const Reservation = require('../models/reservation');
const Ticket = require('../models/ticket');
const User = require('../models/user');
const Seat = require('../models/seat');
router.post('/', async (req, res) => {
  try {
    const reservation = new Reservation({
      singleTrip: req.body.singleTrip,
      Seat: req.body.Seat,
      User: req.body.User,
      ticket: req.body.ticket
    });
    let result = await reservation.save();
    console.log(result);
    res.status(201).json({
      message: 'Handling POST requests to /reservation',
      reservation: result
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
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

router.get('/', async (req, res) => {
  try {
    let reservation = await reservation.find()
      .populate('singleTrip')
      .populate('seat')
      .populate('user')
      .populate('ticket')
      .exec();
    if (reservation) {
      return res.status(200).json({ result: reservation })
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

router.patch('/:qrCode', async (req, res) => {
  try {
    const id = req.params.qrCode;
    const updateOps = {};
    let reservation = await reservation.find({qrCode: qrCode})
    .populate('singleTrip')
    .populate('seat')
    .populate('user')
    .populate('ticket')
    .exec();
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    if (reservation) {
      let res = await Reservation.update({ qrCode: id }, { $set: updateOps }).exec();
      res.status(200).json({
        message: "ticket updated",
        request: {
          result: res
        }
      });
      
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.post('/', async (req, res) => {
  try {
    const qrCode = req.body.qrCode;
    let reservation = await reservation.find({qrCode: qrCode})
      .populate('singleTrip')
      .populate('seat')
      .populate('user')
      .populate('ticket')
      .exec();
    if (reservation) {
      
      return res.status(200).json({ result: reservation })
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
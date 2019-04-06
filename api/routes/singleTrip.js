const express = require('express');
const role = require('../middleware/authorize');


const router = express.Router();
const SingleTrip = require('../models/singleTrip');


router.post('/', async (req, res) => {
  try {
    const trip = new SingleTrip({
      trip: req.body.trip,
      station: req.body.station,
      sort: req.body.sort
    });
    let result = await trip.save();
    console.log(result);
    res.status(201).json({
      message: 'Handling POST requests to /singletrip',
      trip: result
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});
router.get('/', async (req, res) => {
  try {
    let singleTrip = await singleTrip.find()
      .populate('trip')
      .populate('station')
      .exec();
    if (singleTrip) {
      return res.status(200).json({ result: singleTrip })
    } else {
      res.status(404).json({ message: "No valid entry found for provided ID" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
});

module.exports = router;
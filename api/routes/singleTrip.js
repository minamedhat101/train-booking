const express = require('express');
const role = require('../middleware/authorize');


const router = express.Router();
const SingleTrip = require('../models/singleTrip');
const Station = require('../models/station');
const trip = require('../models/trip');


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

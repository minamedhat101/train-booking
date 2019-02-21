const express = require('express');

const router = express.Router();

const Trip = require('../models/trip');
const Ticket = require('../models/ticket');
const Station = require('../models/station');
const trip_ticket = require('../models/trip_ticket');

router.post('/', async (req, res) => {
  try {
    const trip = new Trip({
      number: req.body.number,
      startTime: req.body.startTime,
      train: req.body.train
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
    let trip = await Trip.find()
      .populate('train')
      .exec();
    if (trip) {
      return res.status(200).json({ result: trip })
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

router.get('/:id', async (req, res) => {
  try {
    let trip = await Trip.findById(req.params.id)
    .populate('train')
      .exec();
    if (trip) {
      return res.status(200).json({ result: trip })
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

router.get('/:from/:to', async (req, res) => {
  try {
    const from = req.params.from;
    const to = req.params.to;
    const date = req.query.date;
    const classChoosen = req.query.class;
    console.log('sda')
    let stationFrom = await Station.findOne({ name: from }).exec();
    let stationTo = await Station.findOne({ name: to }).exec();
    let tickets = await Ticket.find({ from: stationFrom.id, to: stationTo.id }).exec();
    console.log(tickets)
    let trip;
    for (const ticket of tickets) {
      trip = await trip_ticket.find({ticket:ticket.id}).populate()
      .populate({
        path: 'trip',
        match: { arrived: false }
      })
      .exec();
    }
    
    let newArray = [];
    if (date) {
      trip.map((val) => {
        if (date === 'am') {
          let hour = new Date(val.trip.startTime).getHours();
          if (hour < 12) {
            newArray.push(val);
          }
          return newArray;
        }
        if (date === 'pm') {
          let hour = new Date(val.startTime).getHours();
          if (hour > 12) {
            newArray.push(val);
          }
          return newArray;
        }
      })
    }
    else if (classChoosen) {
      trip.map((val)=>{
        if (val.ticket.classType === classChosen) {
          newArray.push(val)
        }
        return newArray;
      })
    }
    if (trip) {
      return res.status(200).json({ result: trip })
    } else {
      res.status(404).json({ message: "No valid entry found for provided query" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
})

router.delete('/:id', (req, res) => {
  Trip.remove({ _id: req.params.id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'trip deleted',
        result: resultx
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    let trip = await Trip.update({ _id: id }, { $set: updateOps }).exec();
    res.status(200).json({
      message: "trip updated",
      request: {
        result: trip
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
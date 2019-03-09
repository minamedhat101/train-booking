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
      arrivelTime: req.body.arrivelTime,
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
    trip = await Trip.find().populate()
      .populate({
        path: 'trip',
        match: { arrived: false },
        populate: {
          path: 'trian'
        }
      })
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



let searchData = async (from, to, date, classChoosen) => {
  let trips = await trip_ticket.find({ ticket: ticket.id })
    .populate({
      path: 'trip',
      match: { arrived: false },
      populate: {
        path: 'train'
      }
    })
    .populate({
      path: 'ticket',
      populate: {
        path: 'from',
        path: 'to',
        path: 'ticketType'
      }
    })
    .exec();
  if (from) {
    let stationFrom = await Station.findOne({ name: from }).exec();
    trips = await trip_ticket.find({ ticket: ticket.id }).populate()
      .populate({
        path: 'trip',
        match: { arrived: false },
        populate: {
          path: 'train'
        }
      })
      .populate({
        path: 'ticket',
        populate: {
          path: 'from',
          path: 'to',
          path: 'ticketType'
        }
      })
      .exec();
  }
  if (to) {
    let stationTo = await Station.findOne({ name: to }).exec();
    let tickets = await Ticket.find({ to: stationTo.id }).exec();


  }
  if (date) {

  }
  if (classChoosen) {

  }

}

router.get('/search', async (req, res) => {
  try {
    let trips = await trip_ticket.find()
      .populate({
        path: 'trip',
        match: { arrived: false },
        populate: {
          path: 'train'
        }
      })
      .populate({
        path: 'ticket',
        populate: {
          path: 'from',
          path: 'to',
          path: 'ticketType'
        }
      })
    if (trips) {
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
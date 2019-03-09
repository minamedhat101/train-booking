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
      arrivelTime:req.body.arrivelTime,
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



let serchData = async (from, to, date, classChoosen) => {
  let trips = [];
  if (from) {
    let stationFrom = await Station.findOne({ name: from }).exec();
    let tickets = await Ticket.find({ from: stationFrom.id }).exec();
    for (const ticket of tickets) {
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
    const from = req.query.from;
    const to = req.query.to;
    const date = req.query.date;
    const classChoosen = req.query.classChoosen;
    console.log('sda')
    let stationFrom = await Station.findOne({ name: from }).exec();
    let stationTo = await Station.findOne({ name: to }).exec();
    let tickets = await Ticket.find({ from: stationFrom.id, to: stationTo.id }).exec();
    console.log(tickets)
    let trip;
    for (const ticket of tickets) {
      trip = await trip_ticket.find({ ticket: ticket.id }).populate()
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

    let newArray = [];
    if (date) {
      for (const t of trip) {
        if (date === 'am') {
          console.log('am')
          let hour = new Date(t.trip.startTime).getHours();
          console.log(hour)
          if (hour < 12) {
            newArray.push(t);
          }
        }
        if (date === 'pm') {
          console.log('pm')
          let hour = new Date(t.trip.startTime).getHours();
          console.log(hour)

          if (hour > 12) {
            newArray.push(t);
          }
        }
      }
      trip = newArray
    }
    if (classChoosen) {
      console.log(trip.length)
      for (let i = 0; i < trip.length; i++) {
        console.log('i', i)
        const t = trip[i];
        console.log('class')
        console.log(t.ticket.classType)
        console.log(classChoosen)
        if (t.ticket.classType === classChoosen) {
          newArray.push(t)
          console.log('y')
        } else {
          console.log('n')
          trip.splice(i, 1);

        }
      }
      trip = newArray;
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
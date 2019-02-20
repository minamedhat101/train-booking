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
      from: req.body.from,
      startTime: req.body.startTime,
      to: req.body.to
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
      .populate('from')
      .populate('to')
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
      .populate('from')
      .populate('to')
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

// router.get('/:from/:to', async (req, res) => {
//   try {
//     const from = req.params.from;
//     const to = req.params.to;
//     const date = req.query.date;
//     const classChosen = req.query.class;

//     let stationFrom = await Station.findOne({ name: from }).exec();
//     let stationTo = await Station.findOne({ name: to }).exec();
//     //let ticket = await Ticket.find({ from: stationFrom.id, to: stationTo.id }).exec();
//     let trip = await trip_ticket.find().populate()
//         .populate({
//           path: 'trip',
//           match: { arrived: false }
//         })
//         .populate({
//           path: 'ticket',
//           match: { from: stationFrom.id, to: stationTo.id }
//         })
//         .exec();
//     if (date) {
//       trip.map((val,index,arr)=>{
//         if(date === 'am') {
//           let theDate = new Date(val.startTime);

//         }
//       })
//     }
//     else if (classChosen) {

//     }
//     else if (date && classChosen) {

//     }
//     else {
//       let trip = await trip_ticket.find({}).populate()
//         .populate({
//           path: 'trip',
//           match: { arrived: false }
//         })
//         .populate({
//           path: 'ticket',
//           match: { from: stationFrom.id, to: stationTo.id }
//         })        .exec();
//     }

//     if (trip) {
//       return res.status(200).json({ result: trip })
//     } else {
//       res.status(404).json({ message: "No valid entry found for provided query" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       error: err
//     });
//   }
// })

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
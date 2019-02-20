const express = require('express');

const router = express.Router();

const Ticket = require('../models/ticket');
const TicketType = require('../models/ticketType');
const Station = require('../models/station');

router.post('/', async (req, res) => {
  try {
    const ticket = new Ticket({
      price: req.body.price,
      from: req.body.from,
      to: req.body.to,
      ticketType: req.body.ticketType,
    });
    let result = await ticket.save();
    console.log(result);
    res.status(201).json({
      message: 'Handling POST requests to /ticket',
      ticket: result
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.get('/', async (req, res) => {
  try {
    let ticket = await Ticket.find()
    .populate('from')
    .populate('to')
    .populate('ticketType')
    .exec();
    if (ticket) {
      return res.status(200).json({ result: ticket })
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
    let ticket = await Ticket.findById(req.params.id)
    .populate('from')
    .populate('to')
    .populate('ticketType')
    .exec();
    if (ticket) {
      return res.status(200).json({ result: ticket })
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

router.get('/:query', async (req, res) => {
  try {
    const query = req.params.query;
    let ticketType = await TicketType.findById(query).exec();
    let ticket = await Ticket.find({ ticketType: ticketType })
    .populate('from')
    .populate('to')
    .populate('ticketType')
    .exec();
    if (ticket) {
      return res.status(200).json({ result: ticket })
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

router.get('/:from/:to', async (req, res) => {
  try {
    const from = req.params.from;
    const to = req.params.to;
    let stationFrom = await Station.find({name: from}).exec();
    let stationTo = await Station.find({name: to}).exec();
    let ticket = await Ticket.find({ from: stationFrom.id, to: stationTo.id })
    .populate('from')
    .populate('to')
    .populate('ticketType')
    .exec();
    if (ticket) {
      return res.status(200).json({ result: ticket })
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
  Ticket.remove({ _id: req.params.id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'ticket deleted',
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
    let ticket = await Ticket.update({ _id: id }, { $set: updateOps }).exec();
    res.status(200).json({
      message: "ticket updated",
      request: {
        result: ticket
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
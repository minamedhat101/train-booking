const express = require('express');
const role = require('../middleware/authorize');
const jwt = require('jsonwebtoken');

const router = express.Router();

const TicketType = require('../models/ticketType');

router.post('/', async (req, res) => {
  try {
    const ticketType = new TicketType({
      name: req.body.name,
      description: req.body.description
    });
    let result = await ticketType.save();
    console.log(result);
    res.status(201).json({
      message: 'Handling POST requests to /ticketType',
      ticketType: result
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.get('/', async (req, res) => {
  try {
    let ticketType = await TicketType.find().exec();
    if (ticketType) {
      return res.status(200).json({ result: ticketType })
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
    let ticketType = await TicketType.findById(req.params.id).exec();
    if (ticketType) {
      return res.status(200).json({ result: ticketType })
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


router.delete('/:id', (req, res) => {
  TicketType.remove({ _id: req.params.id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'ticketType deleted',
        result: result
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
    let ticketType = await TicketType.update({ _id: id }, { $set: updateOps }).exec();
    res.status(200).json({
      message: "ticketType updated",
      request: {
        result: ticketType
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
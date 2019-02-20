const express = require('express');
const role = require('../middleware/authorize');

const router = express.Router();

const Seat = require('../models/seat');
const Train = require('../models/train');

router.post('/', async (req, res) => {
  try {
    const seat = new Seat({
      number: req.body.number,
      classType: req.body.classType,
      train: req.body.train,
    });
    let result = await seat.save();
    console.log(result);
    res.status(201).json({
      message: 'Handling POST requests to /seat',
      seat: result
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.get('/', async (req, res) => {
  try {
    let seat = await Ticket.find()
      .populate('train')
      .exec();
    if (seat) {
      return res.status(200).json({ result: seat })
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
    let seat = await Ticket.findById(req.params.id)
      .populate('train')
      .exec();
    if (seat) {
      return res.status(200).json({ result: seat })
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
  Ticket.remove({ _id: req.params.id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'seat deleted',
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
    let seat = await Ticket.update({ _id: id }, { $set: updateOps }).exec();
    res.status(200).json({
      message: "seat updated",
      request: {
        result: seat
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
})

module.exports = router;
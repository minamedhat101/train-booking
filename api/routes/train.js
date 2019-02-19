const express = require('express');
const role = require('../middleware/authorize');
const jwt = require('jsonwebtoken');

const router = express.Router();

const Train = require('../models/train');

router.post('/', async (req, res) => {
  try {
    const train = new Train({
      name: req.body.name,
      number: req.body.number
    });
    let result = await train.save();
    console.log(result);
    res.status(201).json({
      message: 'Handling POST requests to /train',
      train: result
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});



router.get('/', async (req, res) => {
  try {
    let train = await Train.find().exec();
    if (train) {
      return res.status(200).json({ result: train })
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
    let train = await Train.findById(req.params.id).exec();
    if (train) {
      return res.status(200).json({ result: train })
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
    let train = await Train.find({ $or: [{ number: query }, { status: query }] }).exec();
    if (train) {
      return res.status(200).json({ result: train })
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
  Train.remove({ _id: req.params.id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'train deleted',
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
    let train = await Train.update({ _id: id }, { $set: updateOps }).exec();
    res.status(200).json({
      message: "train updated",
      request: {
        result: train
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
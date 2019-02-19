const express = require('express');
const role = require('../middleware/authorize');

const router = express.Router();

const ClassType = require('../models/classType');

router.post('/', async (req, res) => {
  try {
    const classType = new ClassType({
      name: req.body.name,
      description: req.body.description
    });
    let result = await classType.save();
    console.log(result);
    res.status(201).json({
      message: 'Handling POST requests to /classType',
      classType: result
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.get('/profile', role(['user']), async (req, res) => {
  try {
    return res.status(200).json({ result: req.userData })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
});

router.get('/', async (req, res) => {
  try {
    let classType = await ClassType.find().exec();
    if (classType) {
      return res.status(200).json({ result: classType })
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
    let classType = await ClassType.findById(req.params.id).exec();
    if (classType) {
      return res.status(200).json({ result: classType })
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
  ClassType.remove({ _id: req.params.id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'classType deleted',
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
    let classType = await ClassType.update({ _id: id }, { $set: updateOps }).exec();
    res.status(200).json({
      message: "classType updated",
      request: {
        result: classType
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
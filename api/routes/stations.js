const express = require('express');
const router = express.Router();

const Station = require('../models/station');


router.get('/', async (req, res) => {
    try {
      let station = await Station.find().exec();
      if (station) {
        return res.status(200).json({ result: station })
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


  router.post('/', async (req, res) => {
    try {
      const station = new Station({
        name: req.body.name,
        
      });
      let result = await station.save();
      console.log(result);
      res.status(201).json({
        message: 'Handling POST requests to /station',
        station: result
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  });
  
  
  router.get('/:name', async (req, res) => {
    try {
      let station = await Station.find({name:req.params.name}).exec();
      if (station) {
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
      let station = await Station.find({ $or: { name: query } }).exec();
      if (station) {
        return res.status(200).json({ result: station })
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
    Station.remove({ _id: req.params.id })
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'station deleted',
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
      let station = await Station.update({ _id: id }, { $set: updateOps }).exec();
      res.status(200).json({
        message: "station updated",
        request: {
          result: station
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  });
  
  module.exports = router;
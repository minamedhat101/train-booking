const express = require('express');
const router = express.Router();
const config = require('../../config/database');

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
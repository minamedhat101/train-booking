const express = require('express');
const role = require('../middleware/authorize');
const jwt = require('jsonwebtoken');

const router = express.Router();

const config = require('../../config/database');
const Emp = require('../models/employee');

router.post('/signup', async (req, res, ) => {
  try {
    let emp = await Emp.find({ email: req.body.email }).exec();
    if (emp.length >= 1) {
      return res.status(409).json({
        message: 'Mail exists'
      });
    }
    else {
      const emp = new Emp({
        nationalID: req.body.nationalID,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        username: req.body.username,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
      });
      let result = await emp.save();
      console.log(result);
      res.status(201).json({
        message: 'Handling POST requests to /employees',
        emp: result
      });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.post('/login', (req, res) => {
  Emp.findOne({ email: req.body.email }).exec()
    .then(emp=> {
      if (emp.length > 1) {
        res.status(401).json({
          message: 'Auth Failed'
        });
      }
      emp.comparePassword(req.body.password, (err, isMatch) => {
        if (err) {
          res.status(401).json({
            message: 'Auth Failed'
          });
        }
        if (isMatch) {
          const token = jwt.sign({ data: emp }, process.env.SECERET, {
            expiresIn: 604800
          });
          res.json({
            success: true,
            token: token,
            emp: {
              id: emp._id,
              name: emp.name,
              username: emp.username,
              email: emp.email
            }
          });
        } else {
          return res.json({ success: false, msg: err });
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get('/profile', role(['emp']), async (req, res) => {
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
    let emp = await Emp.find().exec();
    if (emp) {
      return res.status(200).json({ result: emp })
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

router.get('/profile/:id', async (req, res) => {
  try {
    let emp = await Emp.findById(req.params.id).exec();
    if (emp) {
      return res.status(200).json({ result: emp })
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

router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    let emp = await Emp.find({ $or: [{ name: query }, { email: query }, { nationalID: query }] }).exec();
    if (emp) {
      return res.status(200).json({ result: emp })
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
  Emp.remove({ _id: req.params.id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Employee deleted',
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


module.exports = router;
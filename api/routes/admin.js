const express = require('express');
const role = require('../middleware/authorize');
const jwt = require('jsonwebtoken');

const router = express.Router();

const config = require('../../config/database');
const Admin = require('../models/admin');

router.post('/signup', async (req, res, ) => {
  try {
    let admin = await Admin.find({ email: req.body.email }).exec();
    if (admin.length >= 1) {
      return res.status(409).json({
        message: 'Mail exists'
      });
    }
    else {
      const admin = new Admin({
        nationalID: req.body.nationalID,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        username: req.body.username,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
      });
      let result = await admin.save();
      console.log(result);
      res.status(201).json({
        message: 'Handling POST requests to /employees',
        admin: result
      });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.post('/login', (req, res) => {
  Admin.findOne({ email: req.body.email }).exec()
    .then(admin=> {
      if (admin.length > 1) {
        res.status(401).json({
          message: 'Auth Failed'
        });
      }
      admin.comparePassword(req.body.password, (err, isMatch) => {
        if (err) {
          res.status(401).json({
            message: 'Auth Failed'
          });
        }
        if (isMatch) {
          const token = jwt.sign({ data: admin }, process.env.SECERET, {
            expiresIn: 604800
          });
          res.json({
            success: true,
            token: token,
            admin: {
              id: admin._id,
              name: admin.name,
              username: admin.username,
              email: admin.email
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

router.get('/profile', role(['admin']), async (req, res) => {
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
    let admin = await Admin.find().exec();
    if (admin) {
      return res.status(200).json({ result: admin })
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
    let admin = await Admin.findById(req.params.id).exec();
    if (admin) {
      return res.status(200).json({ result: admin })
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
    let admin = await Admin.find({ nationalID: query }).exec();
    if (admin) {
      return res.status(200).json({ result: admin })
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
  Admin.remove({ _id: req.params.id })
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
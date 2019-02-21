const Trip = require('./api/models/trip');
const Ticket = require('./api/models/ticket');
const Station = require('./api/models/station');
const trip_ticket = require('./api/models/trip_ticket');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env') });

mongoose.connect(process.env.DATABASE,
	{
		useCreateIndex: true,
		useNewUrlParser: true
	}, err => {
		if (err) return console.log(err);
		console.log('Connected to DB');
  });
  

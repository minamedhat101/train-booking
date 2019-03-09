const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

mongoose.connect(process.env.DATABASE,
	{
		useCreateIndex: true,
		useNewUrlParser: true
	}, err => {
		if (err) return console.log(err);
		console.log('Connected to DB');
	});

app.use(cors());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const userRoute = require('./api/routes/users');
const userTypeRoute = require('./api/routes/userType');
const StationRoute = require('./api/routes/stations');
const adminRoute = require('./api/routes/admin');
const employeeRoute = require('./api/routes/employees');
const seatRoute = require('./api/routes/seat');
const ticketRoute = require('./api/routes/ticket');
const ticketTypeRoute = require('./api/routes/ticketType');
const trainRoute = require('./api/routes/train');
const tripRoute = require('./api/routes/trip');
const reservationRoute = require('./api/routes/reservation');
const singleTripRoute = require('./api/routes/singleTrip');
const Trip_ticketRoute = require('./api/routes/trip_ticket');

app.use('/user', userRoute);
app.use('/userType', userTypeRoute);
app.use('/station', StationRoute);
app.use('/admin', adminRoute);
app.use('/train', trainRoute);
app.use('/employee', employeeRoute);
app.use('/seat', seatRoute);
app.use('/ticket', ticketRoute);
app.use('/ticketType', ticketTypeRoute);
app.use('/trip', tripRoute);
app.use('/reservation', reservationRoute);
app.use('/singleTrip', singleTripRoute);
app.use('/tripTicket', Trip_ticketRoute);

app.get('/', (req, res) => {
	console.log('Welcome')
	res.send('Welcome')

})


app.use((req, res, next) => {
	const error = Error('Not found!');
	error.status = 404;
	next(error);
});

app.use((error, req, res) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
			status: error.status
		}
	});
});

module.exports = app;
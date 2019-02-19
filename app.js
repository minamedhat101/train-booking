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

app.use('/user', userRoute);
app.use('/userType', userTypeRoute);


app.get('/', (req, res)=>{
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
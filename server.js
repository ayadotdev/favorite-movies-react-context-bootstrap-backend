
const mongoose = require('mongoose');
const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const moviesRouter = require('./routes/favorite-movies');

const app = express();
app.use(cors());

const router = express.Router();

require('dotenv').config();


// env variables
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/favorite-movies-react-context-backend';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true},
   () => {console.log("Mongodb database connection established successfully.")});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/favorites', moviesRouter);



app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  });



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
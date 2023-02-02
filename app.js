const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const flash = require('connect-flash');


const indexRouter = require('./routes/index');

// Authentication
const authRouter = require('./routes/auth/authentication');

const applicantRouter = require('./routes/applicant');
const applicantsocmedRouter = require('./routes/applicantsocmed');

// supporting data
const usersRouter = require('./routes/users');
const schoolRouter = require('./routes/school');
const professionRouter = require('./routes/profession');
const socialmediaRouter = require('./routes/socialmedia');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(flash());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'secret' }))
app.use(methodOverride('_method'));

app.use('/', indexRouter);

// Authentication
app.use('/auth', authRouter);

app.use('/applicants', applicantRouter);
app.use('/applicantsocmeds', applicantsocmedRouter);

// supporting route
app.use('/users', usersRouter);
app.use('/schools', schoolRouter);
app.use('/professions', professionRouter);
app.use('/socialmedias', socialmediaRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');

require('./configs/db').connect();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productTypeRouter = require('./routes/productType.router')

const app = express();

app.use(cors());
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/productType', productTypeRouter);

app.use(errorHandler);

module.exports = app;

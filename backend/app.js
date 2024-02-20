const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var cors = require('cors')
const path = require('path');

const errorMiddleware = require('./middleware/error');

// Config
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config();
}

app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));

// Route Imports
const user = require('./routes/userRoute');


app.use('/api/v1', user);
app.use(express.static(path.join(__dirname, 'frontend', 'build')))
console.log(path.join(__dirname, 'frontend', 'build'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
})

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;

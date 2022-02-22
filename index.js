const bodyParser = require('body-parser')
const express = require('express');
const appRouters = require('./routes');
const errorHandler = require('./middlewares/errorHandlers');
const cors = require('cors');

require('dotenv').config();

const app = express();

const port = process.env.APP_PORT || 5000;
const host = process.env.APP_HOST;


const mongoose = require('./db')();
const db = mongoose.connection;
db.once('open', function() {
    console.log("Open MongoDB")
})
app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use((req, res, next) => {
  res.set('Access-Control-Expose-Headers', 'Token');
  next()
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', appRouters);


// Error Middleware
// app.use(errorHandler.genericErrorHandler);

// run production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(port, () => {
  console.log(`Server running on port ${host}:${port}`)
});
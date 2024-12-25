'use strict'

const express = require('express')
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');

dotenv.config();

const userRouter = require("./routes/users");
const notesRouter = require("./routes/notes")
const authenticateToken = require('./middleware/jwt');
const { RepositoryError } = require('./helper/error');
const { failedResponse } = require('./helper/response');

app.use(express.json())
app.use(cors())
app.options('*', cors())

app.use((err, req, res, next) => {
  console.error(err);

  if (err instanceof RepositoryError) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error', details: err.message });
  }

  next()
});

app.use("/v1/users", userRouter);
app.use("/v1/notes", authenticateToken, notesRouter);

app.use(function(req, res){
  res.status(404);
  res.json(failedResponse('not found'))
});

app.use(function(err, req, res, next){
  // whatever you want here, feel free to populate
  // properties on `err` to treat it differently in here.
  res.status(err.status || 500);
  res.json(failedResponse(err.message));
});

app.listen(3000);
console.log('Express started on port 3000');
import express from 'express';
import { router as universityRouter } from './university-router.js';

// create an express app and use JSON
let app = new express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.header('Access-Control-Allow-Headers', 'Origib, Accept, Content-Type');
  next();
})

app.use('/', universityRouter);

app.listen(8080);
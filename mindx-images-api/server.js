const express = require('express');
const mongoose = require('mongoose');
const app = express();

const AuthRouter = require('./modules/auth/auth.route');

// connect mongodb
mongoose.connect('mongodb://localhost:27017/mx-images', (err) => {
  if (err) throw err;
  console.log('MongoDB connected');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const prefix = 'api';

app.use(`/${prefix}/auth`, AuthRouter);

// khởi tạo server
app.listen(8080, (err) => {
  if (err) throw err;
  console.log('Server started');
});
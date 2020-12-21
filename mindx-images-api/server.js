require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const AuthRouter = require('./modules/auth/auth.route');
const PostRouter = require('./modules/posts/posts.route')
const log = require('./modules/shared/log')

// connect mongodb
mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) throw err;
  console.log('MongoDB connected');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(log);

const prefix = 'api';

app.use(`/${prefix}/auth`, AuthRouter);
app.use(`/${prefix}/posts`, PostRouter);


// khởi tạo server
app.listen(8080, (err) => {
  if (err) throw err;
  console.log('Server started');
});
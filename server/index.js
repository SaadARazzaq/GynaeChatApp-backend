const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connectDB');
const router = require('./routes/index');
const cookiesParser = require('cookie-parser');
const { app, server } = require('./socket/index');

app.use(cors({
  // origin: 'https://gynae-chat-app-frontend-11.vercel.app',
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 8080;

app.get('/', (request, response) => {
  response.json({
    message: "Server running at " + PORT
  });
});

//api endpoints
app.use('/api', router);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("Server running at port " + PORT);
  });
});

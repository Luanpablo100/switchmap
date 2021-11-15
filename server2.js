const express = require('express');
const serverless = require('serverless-http');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.post('/updatestate', (req, res) => {
  res.json("Hello");
});

module.exports.handler = serverless(app);
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const fs = require("fs");
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

const timeTableRouter = require('./routes/timeTable');
const lunchRouter = require('./routes/lunch');

app.use('/', timeTableRouter);
app.use('/lunch', lunchRouter);

app.listen(port, () => {
  console.log(`node start! ${port}`);
});

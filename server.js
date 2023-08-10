const express = require("express");
const cors = require("cors");
const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { sequelize } = require("./models");
const timeTableRouter = require("./routes/timeTable");
const lunchRouter = require("./routes/lunch");

app.use("/", timeTableRouter);
app.use("/lunch", lunchRouter);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결됨.");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(port, () => {
  console.log(`node start! ${port}`);
});

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require('morgan');

dotenv.config();
const { sequelize } = require("./models");
const timeTableRouter = require("./routes/timeTable");
const lunchRouter = require("./routes/lunch");
const hitsRouter = require("./routes/hits");

const app = express();
app.set("port", process.env.PORT || 3000);
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결됨.");
  })
  .catch((err) => {
    console.error(err);
  });

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined")); // 배포환경이면
} else {
  app.use(morgan("dev")); // 개발환경이면
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", timeTableRouter);
app.use("/lunch", lunchRouter);
app.use("/hits", hitsRouter);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "node start!");
});

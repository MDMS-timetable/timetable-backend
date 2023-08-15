const express = require("express");
const cors = require("cors");
const passport = require("passport");
const dotenv = require("dotenv");
const session = require("express-session");
const cookieParser = require("cookie-parser");

dotenv.config();
const { sequelize } = require("./models");
const timeTableRouter = require("./routes/timeTable");
const lunchRouter = require("./routes/lunch");
const authRouter = require("./routes/auth");
const pageRouter = require("./routes/page");
const passportConfig = require("./passport");

const app = express();
passportConfig();
app.set("port", process.env.PORT || 8090);
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결됨.");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", timeTableRouter);
app.use("/lunch", lunchRouter);
app.use("/auth", authRouter);
app.use("/", pageRouter);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "node start!");
});

const express = require("express");
const cors = require("cors");
const passport = require("passport");
const dotenv = require("dotenv");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require('morgan');

dotenv.config();
const { sequelize } = require("./models");
const timeTableRouter = require("./routes/timeTable");
const lunchRouter = require("./routes/lunch");
const authRouter = require("./routes/auth");
const pageRouter = require("./routes/page");
const hitsRouter = require("./routes/hits");
const passportConfig = require("./passport");

const app = express();
passportConfig();
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
app.use("/hits", hitsRouter);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "node start!");
});

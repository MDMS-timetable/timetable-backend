const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const fs = require("fs");
app.use(express.json());
app.use(cors());

const Timetable = require("comcigan-parser");
const timetable = new Timetable();

app.use(express.urlencoded({ extended: true }));

const schoolFinder = (schoolName, region) => (schoolList) => {
  const targetSchool = schoolList.find((school) => {
    return school.region === region && school.name.includes(schoolName);
  });
  return targetSchool;
};

timetable
  .init({ cache: 1000 * 60 * 30 }) // 캐시 30분동안 보관
  .then(() => timetable.search("만덕중학교"))
  .then(schoolFinder("만덕중학교", "만덕"))
  .then((school) => timetable.setSchool(59955))
  .then(() => {
    // 수업시간정보
    Promise.all([timetable.getTimetable()]).then((result) => {
      // console.log(result);

      app.get("/timetable", function (req, res) {
        res.json(result[0]); // 수업시간정보 react로 보내기
      });

      // grade, class post로 받아옴
      app.post("/viewtimetable", function (req, res) {
        const r_grade = req.body.grade;
        const r_class = req.body.class;
        console.log("grade : " + r_grade); // react에서 받은 grade출력
        console.log("class : " + r_class); // react에서 받은 class출력
        console.log("----------");
        res.json(result[0][r_grade][r_class]);
      });
    });

    // 시간표
    Promise.all([timetable.getClassTime()]).then((result) => {
      // console.log(result);
      app.get("/schedule", function (req, res) {
        res.json(result[0]); // 시간표 react로 보내기
      });
    });
  });

app.listen(port, () => {
  console.log(`node start! ${port}`);
});

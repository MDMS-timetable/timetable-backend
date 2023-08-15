const express = require("express");
const router = express.Router();
const axios = require("axios");
const { addDays, format } = require("date-fns");

const baseURL = "https://open.neis.go.kr/hub";

const baseParams = {
  Key: "080d50080aa344b8ac686028b5e2a1e2",
  Type: "json",
  ATPT_OFCDC_SC_CODE: "C10",
  SD_SCHUL_CODE: "7201023",
};

const getFormatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "yyyyMMdd");
};

router.get("/mealinfo", async (req, res) => {
  const { start, end } = req.query;

  const params = new URLSearchParams({
    ...baseParams,
    MLSV_FROM_YMD: getFormatDate(start),
    MLSV_TO_YMD: getFormatDate(end),
  });

  // console.log(params.toString());

  try {
    // console.log(start, end);
    const response = await axios.get(
      `${baseURL}/mealServiceDietInfo?${params.toString()}`
    );
    const mealInfo = response.data?.mealServiceDietInfo;

    const rows = mealInfo[1].row;
    let mealsByDate = [];

    for (
      let date = new Date(start);
      date <= new Date(end);
      date = addDays(date, 1)
    ) {
      console.log(date);
      const row = rows[0];

      const year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();

      const fullDate = format(date, "yyyyMMdd");

      if (!row) {
        mealsByDate.push({
          lunch: null,
          calorie: null,
          date: { year, month, day },
        });
        continue;
      }

      const dateParts = row.MLSV_FROM_YMD.match(/(\d{4})(\d{2})(\d{2})/);

      const rowDate =
        dateParts[1] +
        dateParts[2].padStart(2, "0") +
        dateParts[3].padStart(2, "0");

      if (rowDate !== fullDate) {
        mealsByDate.push({
          lunch: null,
          calorie: null,
          date: { year, month, day },
        });
        continue;
      }

      const parsedDDISH_NM = row.DDISH_NM.replace(/\([^()]*\)/g, "")
        .replace(/<br\/>/g, "")
        .replace(/\s{2,}/g, " ")
        .trim();

      mealsByDate.push({
        lunch: parsedDDISH_NM,
        calorie: row.CAL_INFO,
        date: { year, month, day },
      });
      rows.shift();
    }

    console.log(mealsByDate);

    res.send(mealsByDate);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching meal information" });
  }
});

module.exports = router;

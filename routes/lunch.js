const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/mealinfo", async (req, res) => {
  date = req.body.date;
  start = req.body.start;
  end = req.body.end;
  let response;
  if (date.length > 0) {
    try {
      response = await axios.get(
        `https://open.neis.go.kr/hub/mealServiceDietInfo?Key=080d50080aa344b8ac686028b5e2a1e2&Type=json&ATPT_OFCDC_SC_CODE=C10&SD_SCHUL_CODE=7201023&MLSV_YMD=${date}`
      );
    } catch (error) {
      res.status(500).json({ message: "Error fetching meal information" });
    }
  } else {
    try {
      response = await axios.get(
        `https://open.neis.go.kr/hub/mealServiceDietInfo?Key=080d50080aa344b8ac686028b5e2a1e2&Type=json&ATPT_OFCDC_SC_CODE=C10&SD_SCHUL_CODE=7201023&MLSV_FROM_YMD=${start}&MLSV_TO_YMD=${end}`
      );
    } catch (error) {
      res.status(500).json({ message: "Error fetching meal information" });
    }
  }
  const rows = response.data.mealServiceDietInfo[1].row;
  let mealsByDate = [];

  rows.forEach((row) => {
    const cleanedDDISH_NM = row.DDISH_NM.replace(/\([^()]*\)/g, "")
      .replace(/<br\/>/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();

    mealsByDate.push({
      lunch: cleanedDDISH_NM,
      calorie: row.CAL_INFO,
      date: row.MLSV_FROM_YMD,
    });
  });
  res.send(mealsByDate);
});

module.exports = router;

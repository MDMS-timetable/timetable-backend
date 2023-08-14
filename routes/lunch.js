const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/mealinfo", async (req, res) => {
  const { date, start, end } = req.query;
  // const date = req.body.date;
  // const start = req.body.start;
  // const end = req.body.end;
  console.log('date' + date);
  console.log('start' + start);
  console.log('end' + end);
  let response;
  if (date) {
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

  if (!response.data || !response.data.mealServiceDietInfo || response.data.mealServiceDietInfo.length < 2) {
    res.status(500).json({ message: "Error fetching meal information" });
  } else {
    const rows = response.data.mealServiceDietInfo[1].row;
    let mealsByDate = [];

    rows.forEach((row) => {
      const cleanedDDISH_NM = row.DDISH_NM.replace(/\([^()]*\)/g, "")
        .replace(/<br\/>/g, "")
        .replace(/\s{2,}/g, " ")
        .trim();

      const dateParts = row.MLSV_FROM_YMD.match(/(\d{4})(\d{2})(\d{2})/);

      const formatWithLeadingZero = (number) => {
        const strNumber = number.toString();
        return strNumber.length === 1 ? "0" + strNumber : strNumber;
      };

      mealsByDate.push({
        lunch: cleanedDDISH_NM,
        calorie: row.CAL_INFO,
        date: {
          year: parseInt(dateParts[1]),
          month: formatWithLeadingZero(parseInt(dateParts[2])),
          day: formatWithLeadingZero(parseInt(dateParts[3])),
        },
      });
    });
    res.send(mealsByDate);
  }
});

module.exports = router;

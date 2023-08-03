const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/mealinfo", async (req, res) => {
  try {
    const response = await axios.get(
      "https://open.neis.go.kr/hub/mealServiceDietInfo?Key=080d50080aa344b8ac686028b5e2a1e2&Type=json&ATPT_OFCDC_SC_CODE=C10&SD_SCHUL_CODE=7201023&MLSV_YMD=202305"
    );
    const rows = response.data.mealServiceDietInfo[1].row;
    let mealsByDate = [];

    rows.forEach((row) => {
      const cleanedDDISH_NM = row.DDISH_NM
        .replace(/\([^()]*\)/g, '')
        .replace(/<br\/>/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
      
      mealsByDate.push({
        lunch: cleanedDDISH_NM,
        calorie: row.CAL_INFO,
        date: row.MLSV_FROM_YMD
      });
    });
    res.send(mealsByDate);
  } catch (error) {
    res.status(500).json({ message: "Error fetching meal information" });
  }
});

router.post("/mealinfo", async (req, res) => {
  month = req.body.month;
  try {
    const response = await axios.get(
      `https://open.neis.go.kr/hub/mealServiceDietInfo?Key=080d50080aa344b8ac686028b5e2a1e2&Type=json&ATPT_OFCDC_SC_CODE=C10&SD_SCHUL_CODE=7201023&MLSV_YMD=${month}`
    );
    const rows = response.data.mealServiceDietInfo[1].row;
    let mealsByDate = [];

    rows.forEach((row) => {
      const cleanedDDISH_NM = row.DDISH_NM
        .replace(/\([^()]*\)/g, '')
        .replace(/<br\/>/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
      
      mealsByDate.push({
        lunch: cleanedDDISH_NM,
        calorie: row.CAL_INFO,
        date: row.MLSV_FROM_YMD
      });
    });
    res.send(mealsByDate);
  } catch (error) {
    res.status(500).json({ message: "Error fetching meal information" });
  }
});

module.exports = router;

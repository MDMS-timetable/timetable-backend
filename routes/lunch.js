const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/mealinfo", async (req, res) => {
  try {
    const response = await axios.get(
      "https://open.neis.go.kr/hub/mealServiceDietInfo?Key=080d50080aa344b8ac686028b5e2a1e2&Type=json&ATPT_OFCDC_SC_CODE=C10&SD_SCHUL_CODE=7201023&MLSV_YMD=202305"
    );
    const rows = response.data.mealServiceDietInfo[1].row;
    let mealsByDate = {};

    rows.forEach((row) => {
      const date = row.MLSV_FROM_YMD;
      const cleanedDDISH_NM = row.DDISH_NM
        .replace(/\([^()]*\)/g, '')
        .replace(/<br\/>/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
    
      if (!mealsByDate[date]) {
        mealsByDate[date] = [];
      }
      mealsByDate[date].push({
        DDISH_NM: cleanedDDISH_NM,
        CAL_INFO: row.CAL_INFO
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
    let mealsByDate = {};

    rows.forEach((row) => {
      const date = row.MLSV_FROM_YMD;
      const cleanedDDISH_NM = row.DDISH_NM
        .replace(/\([^()]*\)/g, '')
        .replace(/<br\/>/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
    
      if (!mealsByDate[date]) {
        mealsByDate[date] = [];
      }
      mealsByDate[date].push({
        DDISH_NM: cleanedDDISH_NM,
        CAL_INFO: row.CAL_INFO
      });
    });
    res.send(mealsByDate);
  } catch (error) {
    res.status(500).json({ message: "Error fetching meal information" });
  }
});

module.exports = router;

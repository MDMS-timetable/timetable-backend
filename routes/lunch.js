const express = require("express");
const router = express.Router();
const axios = require('axios');

router.get("/mealinfo", async (req, res) => {
  try {
    const response = await axios.get("https://open.neis.go.kr/hub/mealServiceDietInfo?Key=080d50080aa344b8ac686028b5e2a1e2&Type=json&ATPT_OFCDC_SC_CODE=C10&SD_SCHUL_CODE=7201023&MLSV_YMD=20230508");
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching meal information" });
  }
});

router.post("/mealinfo", async (req, res) => {
    ymd = req.body.date
    try {
      const response = await axios.get(`https://open.neis.go.kr/hub/mealServiceDietInfo?Key=080d50080aa344b8ac686028b5e2a1e2&Type=json&ATPT_OFCDC_SC_CODE=C10&SD_SCHUL_CODE=7201023&MLSV_YMD=${ymd}`);
      res.send(response.data);
    } catch (error) {
      res.status(500).json({ message: "Error fetching meal information" });
    }
  });

module.exports = router;
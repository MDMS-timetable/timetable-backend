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
    startymd = req.body.startDate;
    endymd = req.body.endData;
    try {
      const response = await axios.get(`https://open.neis.go.kr/hub/mealServiceDietInfo?Key=080d50080aa344b8ac686028b5e2a1e2&Type=json&ATPT_OFCDC_SC_CODE=C10&SD_SCHUL_CODE=7201023&MLSV_FROM_YMD=${startymd}&MLSV_TO_YMD=${endymd}`);
      res.send(response.data);
    } catch (error) {
      res.status(500).json({ message: "Error fetching meal information" });
    }
  });

module.exports = router;
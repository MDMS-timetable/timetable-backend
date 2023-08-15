const express = require("express");
const router = express.Router();
const Hits_Timetable = require("../models/hits_timetable");
const Hits_Lunch = require("../models/hits_lunch");
const { Op, Sequelize } = require("sequelize");

router.get("/timetable", async (req, res) => {
  try {
    await Hits_Timetable.create({
      hits: Sequelize.literal("NOW()"),
    });
    res.status(200).send("success");
  } catch (error) {
    res.status(500).send("fail");
  }
});

router.get("/meal", async (req, res) => {
  try {
    await Hits_Lunch.create({
      hits: Sequelize.literal("NOW()"),
    });
    res.status(200).send("success");
  } catch (error) {
    res.status(500).send("fail");
  }
});

module.exports = router;

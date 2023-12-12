const express = require("express");
const axios = require("axios");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.get("/proxy", async (req, res) => {
  try {
    // API call to get the office config
    // const response = await axios.get(
    //   "https://winnetdev.wartburg.edu/WrtApi/api/ArcOfficeConfig/Get?officeName=ARC"
    // );
    // res.json(response.data);

    // Temporary mock data

    const dataPath = path.join(__dirname, "dev-data.json");

    const jsonData = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    console.log("JSON data:", jsonData);

    // Send the JSON data as response
    res.json(jsonData);
  } catch (error) {
    console.error("Error fetching from external API:", error);
    res.status(500).send("Error fetching from external API");
  }
});

module.exports = router;

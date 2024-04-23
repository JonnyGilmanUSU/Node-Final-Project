const express = require("express");
const router = express.Router();

const dogController = require("../controllers/dogController");

router.get("/dog", dogController.getDog);




module.exports = router;
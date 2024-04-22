const express = require("express");
const router = express.Router();

const apiController = require("../controllers/apiController");


router.get("/getToken", apiController.getToken);

router.get("/styles", apiController.verifyToken , apiController.getStyles);


module.exports = router;

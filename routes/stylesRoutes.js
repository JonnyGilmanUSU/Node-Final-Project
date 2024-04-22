// Imports
const express = require("express");
const router = express.Router();
const stylesController = require("../controllers/stylesController");
const upload = require('../util/multerConfig');
const isAdmin = require('../util/isAdmin');


// Routes
router.get("/new-style", isAdmin, stylesController.getNewStyle);

router.post("/new-style", isAdmin, upload.single('imageUrl'), stylesController.addNewStyle);

router.get("/:styleSlug", stylesController.getSingleStyle);

router.get("/", stylesController.getStyles);




module.exports = router;

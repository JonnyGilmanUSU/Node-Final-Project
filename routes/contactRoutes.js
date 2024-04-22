const express = require("express");
const router = express.Router();
const isAdmin = require('../util/isAdmin');

const contactController = require("../controllers/contactController");

router.get("/new", contactController.getContact);

router.post("/create", contactController.createContact);

router.post("/:id/update", isAdmin,  contactController.editContact);
router.get("/:id/edit", isAdmin, contactController.getEditContact);


router.get("/", contactController.getContactList);

module.exports = router;

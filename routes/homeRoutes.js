const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
const userController = require('../controllers/userController');

const isAdmin = require('../util/isAdmin');

// Define route handlers
router.get("/", homeController.getHome);

router.get("/about", homeController.getAbout);

router.get("/login", userController.getLogin);

router.post("/login", userController.authUser, userController.loginWebApp);

router.get("/register", userController.getRegister);

router.post("/register", userController.postRegister);

router.get("/logout", userController.getLogout);

router.post("/saveFavorite/:styleId", userController.saveFavorite);

router.get("/favoriteStyles", userController.getFavoriteStyles);

router.get("/manageAdmins", isAdmin, userController.getManageAdmins);

router.post("/update-admin-status", isAdmin, userController.updateAdminStatus);




module.exports = router;

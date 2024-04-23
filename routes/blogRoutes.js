const express = require("express");
const router = express.Router();
const isAdmin = require('../util/isAdmin');


const blogController = require("../controllers/blogController");


router.get("/getCreateBlogPost", isAdmin, blogController.getCreateBlogPost);

router.post("/createBlogPost", isAdmin, blogController.createBlogPost);

router.get("/:titleSlug", blogController.getSingleBlog);

router.get("/", blogController.getBlogs);




module.exports = router;

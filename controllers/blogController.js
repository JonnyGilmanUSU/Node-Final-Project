const BlogPost = require("../models/BlogPost");

exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await BlogPost.find().sort({ postDate: -1});
    res.render("blog", { pageTitle: "Blog", blogs, path: req.baseUrl });
  } catch (e) {
    console.log("error: ", e);
  }
};

exports.getSingleBlog = async (req, res, next) => {
  const { titleSlug } = req.params;
  // console.log("TITLE SLUG:  ", req.params.titleSlug)
  try {
    const blog = await BlogPost.findOne({ titleSlug: titleSlug.toLowerCase() });
    // console.log("Found BLOG: ", blog);  // Check what is actually found
    res.render("blog-single-post", {
      pageTitle: blog.title,
      blog,
      path: req.baseUrl,
    });
  } catch (e) {
    console.log("error: ", e);
  }
};

exports.getCreateBlogPost = (req, res, next) => {
  res.render("createBlogPost", { pageTitle: "Create Blog Post", path: '/blog/getCreateBlogPost' });
};


exports.createBlogPost = async (req, res, next) => {
  try {
    const { title, imageURL, summary, content } = req.body;

    // Create a new blog post
    const newBlogPost = new BlogPost({
      title,
      imageURL,
      summary,
      content,
    });

    // Save the blog post to the database
    await newBlogPost.save();

    // Return a success response
    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      data: newBlogPost,
    });
  } catch (err) { 
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: messages,
      });
    } else {
      console.error("Error creating blog post:", err);
      res.status(500).json({
        success: false,
        message: "An error occurred while creating the blog post",
      });
    }
  }
};

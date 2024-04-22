const MustacheStyle = require("../models/MustacheStyle");

exports.getStyles = async (req, res, next) => {
  try {
    const styles = await MustacheStyle.find();
    console.log("Get Styles")

    res.render("gallery", { pageTitle: "Gallery", styles, path: req.baseUrl });
  } catch (e) {
    console.log("error: ", e);
  }
};

exports.getSingleStyle = async (req, res, next) => {
  const { styleSlug } = req.params;
  try {
    console.log("Single Style")

    const style = await MustacheStyle.findOne({ styleSlug: styleSlug.toLowerCase() });

    res.render("gallery-single-post", {
      pageTitle: style.title,
      style,
      path: req.baseUrl,
    });
  } catch (e) {
    console.log("error: ", e);
  }
};

exports.getNewStyle = (req, res, next) => {
  res.render('new-style', {
    path: '/new-style',
    pageTitle: 'Add New Style',
  })
}

exports.addNewStyle = async (req, res, next) => {
  const { title, description } = req.body;
  const imageUrl = req.file;

  console.log(title)
  console.log(description)
  console.log(imageUrl)
  
  try {
    const newStyle = new MustacheStyle({
      title,
      description,
      imageURL: 'images/' + imageUrl.filename
    });

    await newStyle.save();
    res.redirect('/styles');

  } catch (error) {
    console.log("Error adding new style:  ", error);
  }
}
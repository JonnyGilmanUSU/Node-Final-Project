exports.getHome = (req, res, next) => {
  console.log(req.session)
  if (req.session.isLoggedIn && req.session.user) {
    const firstName = req.session.user.firstName;
    return res.render('index', { pageTitle: 'Home', path: '/', firstName: firstName });
  } else {
    res.render("index", { pageTitle: "Home", path: req.path });
  }
};

exports.getAbout = (req, res, next) => {
  res.render("about", { pageTitle: "About", path: req.path });
};

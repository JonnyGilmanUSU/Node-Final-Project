const User = require('../models/User');
const MustacheStyle = require('../models/MustacheStyle');

exports.getLogin = (req, res, next) => {
    res.render('login', { pageTitle: 'Login', path: '/login' })
};

exports.getRegister = (req, res, next) => {
    res.render('register', { pageTitle: 'Register', path: '/register' })
};

exports.authUser = async (req, res, next) => {
    // Retrieve values from form
    const { email, password } = req.body;

    try {
      // Find matching user by email
      const user = await User.findOne({ email: email });
      let passwordsMatch = false;
      if (user) {
        passwordsMatch = await user.validatePassword(password);
      }
      res.locals.user = user;
      res.locals.passwordsMatch = passwordsMatch;
      next();
    } catch (error) {
      console.log(error);
      next();
    }
};

exports.loginWebApp = async (req, res, next) => {
    const { user, passwordsMatch } = res.locals;
    // console.log("user and password are", user, passwordsMatch);
  
    if (user && passwordsMatch) {
      req.session.isLoggedIn = true;
      req.session.user = user;
      return req.session.save((err) => {
        console.log(err);
        res.redirect('/');
      });
    }
    return res.render("login", {
      pageTitle: "Login",
      message: "Invalid Credentials",
      entries: req.body,
    });
};


exports.postRegister = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    try {
    // Use static method of model to check if the email is unique
    const emailUnique = await User.checkEmailUnique(email);

    // Email Not Unique
    if (!emailUnique) {
        return res.render('register', { 
            pageTitle: 'Register', 
            path: '/register',
            message: 'Sorry, that email address is taken. Please choose a different one.',
            entries: req.body
        });
    }

    // Email is Unique then Create User Model
    const user = new User({
        firstName,
        lastName,
        email,
        password
    });
    // Save User 
    await user.save();
    console.log('Registration Success!');
    res.redirect('/login')

    } catch (error) {
        console.log(error)
        res.render("register", {
            pageTitle: "Signup",
            message: "Oops!  Please correct the following errors and try again:",
            entries: req.body,
        });
    }
};

exports.getLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/')
        console.log("Log Out Success!")
    });
};

exports.saveFavorite = async (req, res, next) => {
  try {
    // Gather userId from session
    const userId = req.session.user._id;
    // Gather styleId from req.params
    const styleId = req.params.styleId;
    
    // Find userId and update favoriteStyles array
    const user = await User.findByIdAndUpdate(userId, { $addToSet: { favoriteStyles: styleId } }, { new: true });
    res.redirect('/styles')
    console.log("Style Favorited")
  } catch (error) {
    console.log("Error saving favorite style: ", error);
  }
}

exports.getFavoriteStyles = async (req, res, next) => {
  try {
    const userId = req.session.user._id;

    const user = await User.findById(userId).populate('favoriteStyles');

    const favoriteStyles = user.favoriteStyles;

    console.log("Favorite styles: ", favoriteStyles)

    res.render('favorite-styles', { 
      pageTitle: 'Favorite Styles', 
      favoriteStyles, 
      path: '/favoriteStyles' 
    });
  } catch (error) {
    console.log("Error fetching favorite styles:  ", error);
  }
}


exports.getManageAdmins = async (req, res, next) => {
  try {
    const users = await User.find();
    res.render('manage-admins', {
      pageTitle: 'Manage Admins',
      path: '/manageAdmins',
      users: users
    })
  } catch (error) {
    console.log("Error rendering Manage Amin Page:  ", error);
  }
};

exports.updateAdminStatus = async (req, res, next) => {
  const updates = req.body.users;
  console.log("UPADTES: ", updates)

  try {
    for (const userId in updates) {
      const isAdmin = updates[userId].isAdmin === 'on';
      await User.findByIdAndUpdate(userId, { admin: isAdmin })
      console.log("Admin status updated for user ID:", userId, "New admin status:", isAdmin);
    }

    res.redirect('/manageAdmins');
  } catch (error) {
    console.log("Error updating admin status")
  }
}

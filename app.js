// Import path to construct path file names
const path = require("path");

// Import npm libraries
const express = require("express");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config();




// import routes
const homeRoutes = require("./routes/homeRoutes");
const stylesRoutes = require("./routes/stylesRoutes");
const blogRoutes = require("./routes/blogRoutes");
const contactRoutes = require("./routes/contactRoutes");
const apiRoutes = require("./routes/apiRoutes");
const dogRoutes = require('./routes/dogRoutes');


const middleware = require("./middleware")


// Database connection string
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.kuylelu.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`;


// Initialize session store
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const app = express();

// Load middleware to point to static resources
app.use(express.static(path.join(__dirname, "public")));

// Load middleware to parse body
app.use(express.urlencoded({ extended: true }));

// Set the templating engine using app.set
app.set("view engine", "ejs");

// Tell the application where to find the views
app.set("views", "views");

app.use(expressLayouts);


// Register session middleware
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);


app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.user = req.session.user;
  next();
})



app.use(middleware);

app.use("/styles", stylesRoutes);
app.use("/blog", blogRoutes);
app.use("/contacts", contactRoutes);
app.use("/api", apiRoutes)
app.use(dogRoutes);


app.use(homeRoutes);


// start the server on port 3000
mongoose.connect(MONGODB_URI)
  .then(() => {
    // Launch the app
    // app.listen(process.env.PORT || 3000);
    app.listen(3000);

  })

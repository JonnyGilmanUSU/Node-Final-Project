const e = require("express");
const MustacheStyle = require("../models/MustacheStyle")
const jsonwebtoken = require('jsonwebtoken');

const SECRET_KEY = 'secret_key';

exports.getStyles = async (req, res, next) => {
    try {
      const styles = await MustacheStyle.find();

      styles.forEach(style => {
        style.imageURL = `https://localhost:3000/${style.imageURL}`;
      });

      console.log(styles);
      res.json(styles);

    } catch (e) {
      console.log("error: ", e);
    }
};

exports.getToken = (req, res, next) => {
    const token = jsonwebtoken.sign({},  SECRET_KEY, { expiresIn: "24hr" });
    res.json({ token })
}

exports.verifyToken = (req, res, next) => {
    const token = req.query.token;
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        jsonwebtoken.verify(token, SECRET_KEY);
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
}

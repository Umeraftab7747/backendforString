const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const { userDb } = require("../model/userdb");

// api
// var API_KEY = "72aef744734ec6101950ba7944f9f13f-100b5c8d-2273b885";
// var DOMAIN = "sandbox8e72cf00df7c440e80184d74c9553685.mailgun.org";
// var mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

// USER Signup ADDED
router.post("/signup", (req, res) => {
  const data = req.body;
  const NewUser = new userDb({
    firstName: data.firstName,
    LastName: data.LastName,
    Password: data.Password,
    Email: data.Email,
  });
  NewUser.save()
    .then((user) => {
      res.status(200).json({
        user,
        msg: "User account has been Created",
        status: "200",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
        status: 500,
      });
    });
});

// USER Sign-in
router.post("/signin", (req, res) => {
  userDb
    .findOne({ Email: req.body.Email, Password: req.body.Password })
    .then((user) => {
      if (user) {
        res.status(200).json({
          sucess: true,
          msg: "User Login",
          user: user,
        });
      } else {
        res.status(500).json({ status: "404", msg: "User not found" });
      }
    })
    .catch((error) => {
      res.status(404).json({ status: "404", msg: err.message });
    });
});

module.exports = router;

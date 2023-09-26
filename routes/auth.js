const express = require("express");
const { check, body } = require("express-validator");

const User = require("../models/user");
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  [
    body("email", 'Please Enter a valid mail id').isEmail().normalizeEmail(),
    body("password", "Enter correct password!!")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .custom((value, { req }) => {
        // if (value === "test2@gmail.com") {
        //   throw new Error("this email is forbidden. Try entering new");
        // }
        // return true;
        // console.log(value);
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('Email exist already.Please enter new email!!');
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "Password must be length of 5 charecters and must include alphabets and numbers"
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword").trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Re-enter the password!!.Bad Credentials...");
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;

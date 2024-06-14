import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import isAuth from "../middleware/jwt.middleware.js";
const router = express.Router();

const salts = 10;

router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    //CHECKS IF REQ BODY HAS ALL INFO (email, password and username)
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ message: "Please provide email, username, and password" });
    }

    //TRY TO FIND A USER IN DATABASE THROUGH EMAIL OR USERNAME PROVIDED

    const user = await User.findOne({
      $or: [{ email }, { username }],
    });
    //IF IT FINDS A USER, THEY ALREADY EXIST
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Regex to validate email (checks if theres word@word.com format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Provide a valid email address." });
      return;
    }

    // Use regex to validate the password format
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          "Password must have at least 8 characters and contain at least one number, one lowercase, one uppercase letter and a special character.",
      });
      return;
    }

    const salt = await bcrypt.genSalt(salts);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    res.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    //CHECKS IF REQ BODY HAS ALL INFO (email OR username AND password)
    if (!(email || username) || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email or username, and password" });
    }

    //CHECK IF USER EXISTS BY LOOKING FOR THEM THROUGH EMAIL OR USERNAME
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    //CHECK IF PASSWORD IS CORRECT, USING BCRYPT TO COMPARE USER INPUT AND PASSWORD IN DATABASE
    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res
        .status(401)
        .json({ message: "Email/Username or password incorrect" });
    }
    //DELETE THE USER PASSWORD FROM THE USER VARIABLE SO WE CAN USE THAT AS PAYLOAD
    delete user._doc.password;

    //we use jwt.sign() to creaqte a token upon login
    //to sign we need some info:
    // payload = info to encrypt/encode (user object in this example)
    // the SECRET in the .env file (could have any value, it's like a password)
    // algorithm = just use "HS256"
    // expiresIn = the amount of time in hours that your token will be valid for
    const jwtToken = jwt.sign(
      { payload: { user, customProp: "hey abner" } },
      process.env.TOKEN_SIGN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "24h",
      }
    );

    res.json({ user, jwtToken });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//the verify route has the isAuth middleware from jwt.middleware.js file
//it will check for a token and if there is a token, we send a OK response and the user object that comes from decoding the token
router.get("/verify", isAuth, async (req, res) => {
  try {
    console.log("hello, this is the logged user in verify ->", req.user);
    res.json({ message: "User is logged in.", user: req.user });
  } catch (error) {
    console.log(error);
  }
});
export default router;

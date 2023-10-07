const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const google = require("googleapis").google;
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");

require("dotenv").config();

const otpStore = {};

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000 && err.keyPattern && err.keyPattern.email == 1) {
    errors.email = "that email is already registered";
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "verysecuresecretlol", {
    expiresIn: maxAge,
  });
};

const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const foundUser = await User.findOne({username: username});
    if(foundUser) {
      return res.status(409).json({
        error: "Username is Taken!"
      });
    }
    const user = await User.create({ name, username, email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

const logout = async (req, res) => {
  const { email } = req.body;

  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

const activate = async (req, res) => {
  try {
    const { email } = req.body;

    const OAuth2 = google.auth.OAuth2;

    const FROM_EMAIL = process.env.FROM_EMAIL;
    const CLIENT_ID = process.env.OAUTH2_API_CLIENT_ID;
    const CLIENT_SECRET = process.env.OAUTH2_API_CLIENT_SECRET;
    const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

    const OAuth2_client = new OAuth2(CLIENT_ID, CLIENT_SECRET);

    OAuth2_client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const accessToken = OAuth2_client.getAccessToken();

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const salt = await bcrypt.genSalt();
    const hashedOtp = await bcrypt.hash(otp, salt);

    otpStore[email] = {
      otp: hashedOtp,
      expiresAt: Date.now() + 300000, // 5 minutes (adjust as needed)
    };

    const html = `
        <h1>Account Verification</h1>
        <p>Your OTP is: ${otp}</p>
        <p>It will expire in 5mins</p>
    `;

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: FROM_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
      port: 465,
      secure: true,
    });

    const result = await transporter.sendMail({
      from: "verify <edak.messenger@gmail.com>",
      to: email,
      subject: "Account Verification",
      html: html,
    });

    console.log(`Message Sent: ${result.messageId}`);
    console.log(result.accepted);
    console.log(result.rejected);

    res.status(201).json({
      message: "OTP sent to email for verification",
    });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred",
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const storedOtpData = otpStore[email];

    if (!storedOtpData) {
      return res.status(404).json({ error: "OTP not found" });
    }

    if (Date.now() > storedOtpData.expiresAt) {
      delete otpStore[email];
      return res.status(401).json({ error: "OTP has expired" });
    }

    const isOtpValid = await bcrypt.compare(otp, storedOtpData.otp);

    if (isOtpValid) {
      delete otpStore[email];
      res.status(201).json({ message: "OTP verified successfully" });
    } else {
      res.status(401).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  register,
  login,
  logout,
  activate,
  verifyOtp,
};

const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

console.log(process.env.JWT_SECRET);

class usercontroller {
  static register = async (req, res) => {
    try {
      //console.log(req.body)
      const { name, email, password } = req.body;
      const existinguser = await userModel.findOne({ email });
      if (existinguser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const data = await userModel.create({
        name,
        email,
        password: hashedPassword,
      });
      res.json({
        data,
        msg: "user insert success",
      });
    } catch (error) {
      console.log(error);
    }
  };
  static login = async (req, res) => {
    try {
      // console.log(req.body)
      const { email, password } = req.body;

      const user = await userModel.findOne({ email });
      //console.log(user)
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: " Invalid credentials " });
      }
      //console.log(isMatch)
      //token create
      const token = jwt.sign(
        { ID: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "2d" } //2 din me token expire ho jayega
      );
      //  console.log(token)

      // Send token in HTTP-Only cookie
      // Inside login controller
      res.cookie("token", token, {
        httpOnly: true,
        secure: true, // ✅ required for HTTPS (Render + Netlify are HTTPS)
        sameSite: "None", // ✅ required for cross-site cookies
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
      });

      res.status(200).json({
        message: "Login successful",
        role: user.role,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error });
    }
  };
  static profile = async (req, res) => {
    try {
      console.log("hello profile");
    } catch (error) {
      console.log("error");
    }
  };

  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "logout successfully" });
    } catch (error) {
      console.log("error");
    }
  };
}
module.exports = usercontroller;

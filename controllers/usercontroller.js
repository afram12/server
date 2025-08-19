const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');



class usercontroller {

    static register = async (req, res) => {
        try {
            //console.log(req.body)
            const { name, email, password } = req.body
            const existinguser = await userModel.findOne({ email });
            if (existinguser) {
                return res.status(400).json({ message: "Email already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const data = await userModel.create({
                name, email, password: hashedPassword
            })
            res.json({
                data,
                msg: "user insert success"
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    static login = async (req, res) => {
        try {
            const { email, password } = req.body;
            // Find user by email
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            // Compare passwords
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials " })
            }
            //token create
            var token = jwt.sign({ ID: user._id }, process.env.JWT_SECRET,
                {expiresIn: "2d"}
            );
            // console.log(token)

            //send token in http-only cookie
            res.cookie("token", token, {
                httpOnly: true,
            });

            // Success
            res
                .status(200)
                .json({

                    message: "Login successful",
                    role: user.role,
                    name: user.name,
                    email: user.email,
                });
        }

        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
    static profile = async (req, res) => {
        try {
            console.log("hello profile")
        }
        catch (error) {
            console.log("error")
        }

    }

    static logout = async (req, res) => {
        try {
            res.clearCookie('token')
            res.status(200).json({message:"logout successfully"})
        }
        catch (error) {
            console.log("error")
        }

    }
}
module.exports = usercontroller
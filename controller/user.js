import User from "../models/user.js";
import bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';


export const registerUser = async (req, res,next) => {
    try {
        const { name, password, email, mobile } = req.body;
        if (!name || !password || !email || !mobile) {
            return res.status(400).json({
                errorMessage: "Bad request"
            });
        }
        // yup,joi,express validator of checking req.body

        const isExistingUser = await User.findOne({ email: email });
        if (isExistingUser) {
            return res.status(409).json({
                message: "User alreday exist"
            })
        }
        res.json({
            message: "User register success"
        })
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = new User({
            name,
            email,
            password: hashedPassword,
            mobile,
        });

        await userData.save();


    }
    catch (e) {
        next(e);
    }
};

export const loginUser = async (req, res,next) => {
    try {
        const { password, email } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        const userDetails = await User.findOne({ email: email });
        if (!userDetails) {
            return res
                .status(409)
                .json({ errorMessage: "User doesn't exists" });
        }

        const isPasswordMatched = await bcrypt.compare(
            password,
            userDetails.password
        );

        if (!isPasswordMatched) {
            return res
                .status(401)
                .json({ errorMessage: "Invalid credentials" });
        }

        const token = jwt.default.sign(
            { userId: userDetails._id },
            process.env.SECRET_KEY,
            { expiresIn: "60h" }
        );

        res.json({
            message: "User logged in",
            token: token,
            userId: userDetails._id,
            name: userDetails.name,
        });
    } catch (error) {
        // console.log(error)
        // res.status(500).json({errorMessage:"somthing is not wrong!!"})
       next(error);
    }
}
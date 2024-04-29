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
        if (!password || !email) {
            return res.status(400).json({
                errorMessage: "Bad request"
            });
        }
        const userDetails = await User.findOne({ email: email });
        if (!userDetails) {
            return res.status(409).json({
                message: "User doesn't exist"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, userDetails.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                errorMessage: "Invalid cred"
            });
        }
        //
        const token = jwt.sign({ userID: userDetails._id }, process.env.SECRET_KEY, { expiresIn: "60h" })


        res.json({
            message: "User loggedIn",
            token: token,
            name: userDetails.name,
        })
    }
    catch (e) {
        next(e);
    }
}
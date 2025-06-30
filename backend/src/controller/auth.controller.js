import User from "../models/user.model.js";
import "dotenv/config"
import jwt from "jsonwebtoken"

export const signupC = async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        if (!fullname || !password || !email) {
            return res.status(400).json("All Fields Are Required");
        }
        if (password.length < 6) {
            return res.status(400).json("Password Should Be More Then 6 characters");
        }
        const emailChar = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailChar.test(email)) {
            return res.status(400).json("Enter a Valid Email");
        }

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json("User Already exist");
        }

        const index = Math.floor(Math.random() * 100) + 1; // range - (1 - 100)
        const avatar = `https://avatar.iran.liara.run/public/${index}.png`;


        const newUser = await User.create({
            fullname,
            email,
            password,
            profilePic: avatar,
        })

        // Save user to stream

        
   



        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
        res.cookie("Token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(200).json({ success: true, user: newUser })

    } catch (error) {
        console.log("Error in SignUp controller", error);
        res.status(500).json({ Message: "Internal Server Error" })
    }
};
export const loginC = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json("All field are Required")
        }
        const userExist = await User.findOne({ email })
        if (!userExist) {
            return res.status(400).json("Invalid Credentials")
        }
        const passCorrect = await userExist.PassAuth(password)
        if (!passCorrect) {
            return res.status(400).json("Credentials are Incorrect")
        }

        const token = jwt.sign({ userId: userExist._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
        res.cookie("Token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        });

        res.status(200).json({ success: true, user: "Signin !!" });
    } catch (error) {
        console.log("Error in Sign in :", error);
        res.status(500).json({ Message: "Internal Server Error" })
    }
};
export const logoutC = (req, res) => {
    res.clearCookie("Token")
    res.status(200).json({ success: true, Message: "Logout Successful" });
};

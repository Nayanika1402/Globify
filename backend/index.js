require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const { authenticateToken } = require("./utilities");

const User = require("./models/user.model");

mongoose.connect(config.connectionString);

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// Create Account
app.post("/create-account", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ error: true, message: "All fields are required" });
        }

        const isUser = await User.findOne({ email });
        if (isUser) {
            return res.status(400).json({ error: true, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        await user.save();

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "72h" }
        );

        return res.status(201).json({
            error: false,
            user: { fullName: user.fullName, email: user.email },
            accessToken,
            message: "Registration Successful",
        });
    } catch (error) {
        console.error("Error in /create-account:", error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "72h" }
        );

        return res.json({
            error: false,
            message: "Login Successful",
            user: { fullName: user.fullName, email: user.email },
            accessToken,
        });
    } catch (error) {
        console.error("Error in /login:", error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// Get User
app.get("/get-user", authenticateToken, async (req, res) => {
    try {
        const { userId } = req.user;

        const isUser = await User.findOne({ _id: userId }); // Fixed brackets

        if (!isUser) {
            return res.sendStatus(401); // Unauthorized
        }

        return res.json({
            user: isUser,
            message: "",
        });
    } catch (error) {
        console.error("Error in /get-user:", error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
module.exports = app;

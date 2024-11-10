require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");
const bcrypt =  require("bcrypt");
const express = require("express");
const cors = require("cors");

const jwt = require("jsonwebtoken");

mongoose.connect(config.connectionString);

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

//Create Account
app.get("/create-account", async (req, res) => {
});

app.listen(8000);
module.exports = app;
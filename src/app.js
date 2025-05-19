"use strict";
const dotenv = require("dotenv");
const express = require("express");
const app = express();

// Environment variable handling
const envFilePath = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFilePath });

const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;

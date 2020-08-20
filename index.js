require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

app.use(bodyParser.json());

// import router
const router = require("./routes/router");

app.use("/api/v1", router);

app.listen(port, () => console.log(`Listening port ${port}`));
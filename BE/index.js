const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const morgan = require("morgan");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")
const albumRoute = require("./routes/album")
const placeRoute = require("./routes/place")
dotenv.config();
//CONNECT TO DATABASE
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected!'));

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("common"));

app.get("/api", (req, res) => {
  res.status(200).json("hello");
})

//ROUTES

app.use("/v1/user", userRoute);
app.use("/v1/album", albumRoute);
app.use("/v1/place", placeRoute)
app.listen(8000, () => {
  console.log("Server is running...")
})

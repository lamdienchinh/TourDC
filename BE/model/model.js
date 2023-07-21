const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String
  },
  phonenumber: {
    type: String
  },
  avatar: {
    type: String,
  },
  walletAddress: {
    type: String
  }
})

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  trips: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip"
  }
})

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  placeid: {
    type: Number,
  },
  description: {
    type: String,
  },
  referPlaces: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place'
  }],
  thumbnail: {
    type: String,
  },
  intro: {
    type: String,
  },
  address: {
    type: String,
  },
  list_imgs: {
    type: [String]
  },
  type: {
    type: String,
  }
})
const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  time: {
    type: String,
  },
  list_imgs: {
    type: [String],
  },
  trHash: {
    type: String,
  },
  placeid: {
    type: String,
  }
})

let User = mongoose.model("User", userSchema);
let Author = mongoose.model("Album", albumSchema);
let Place = mongoose.model("Place", placeSchema);
let Trip = mongoose.model("Trip", tripSchema);

module.exports = { User, Author, Place, Trip };
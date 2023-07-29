const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  email: {
    type: String
  },
  phonenumber: {
    type: String
  },
  avatar: {
    type: String,
    default: "https://haycafe.vn/wp-content/uploads/2022/02/Avatar-trang-den.png"
  },
  walletAddress: {
    type: String
  },
  privateKey: {
    type: String
  },
  password: {
    type: String
  },
  vouchers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Voucher"
  },
  trips: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Trip"
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
  list_trips: {
    type: [mongoose.Schema.Types.ObjectId],
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
  },
  trips: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Trip'
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
  },
  like: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
  },
  dislike: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
  },
  tripid: {
    type: String,
  },
  reviewtime: {
    type: Date,
    default: Date.now()
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  rate: {
    type: Number,
  }
})
const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  albums: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Album'
  },
  content: {
    type: String,
  },
  type: {
    type: String,
  },
  like: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  dislike: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  comment: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Comment'
  }
})

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
  }
})

const vouchersaleSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  number: {
    type: Number,
  },
  img: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  }
})

const voucherSchema = new mongoose.Schema({
  detail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VoucherSale'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  trHash: {
    type: String
  },
  isUsed: {
    type: String,
    default: "Available"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

let User = mongoose.model("User", userSchema);
let Album = mongoose.model("Album", albumSchema);
let Place = mongoose.model("Place", placeSchema);
let Trip = mongoose.model("Trip", tripSchema);
let Post = mongoose.model("Post", postSchema);
let Comment = mongoose.model("Comment", commentSchema);
let VoucherSale = mongoose.model("VoucherSale", vouchersaleSchema);
let Voucher = mongoose.model("Voucher", voucherSchema);
module.exports = { User, Album, Place, Trip, Post, Comment, VoucherSale, Voucher };
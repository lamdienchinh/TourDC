const { User } = require("../model/model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { cloudinary } = require('../utils/index.js')
let refreshTokens = []

const userController = {
  //ADD user
  addUser: async (req, res) => {
    res.status(200).json(req.body);
    try {
      const newUser = new User(req.body);
      const saveUser = await newUser.save();
    } catch (error) {
      res.status(500).json(err);
    }
  },
  //GET ALL USERS
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin
      }, process.env.JWT_ACCESS_KEY,
      { expiresIn: "24h" }
    )
  },
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin
      }, process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    )
  },
  login: async (req, res) => {
    try {
      let user = await User.findOne(req.body);
      if (!user) {
        let newUser = new User(req.body);
        let addUser = await newUser.save();
        user = addUser;
      }
      const accessToken = userController.generateAccessToken(user)
      const refreshToken = userController.generateRefreshToken(user)
      refreshTokens.push(refreshToken)
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false
      })
      const { ...others } = user._doc;
      return res.status(200).json({ ...others, accessToken: accessToken });
    }
    catch (err) {
      return res.status(500).json(err)
    }
  },
  logout: async (req, res) => {
    try {
      refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken)
      res.clearCookie("refreshToken");
      res.status(200).json('Log out')
    }
    catch (err) {
      return res.status(500).json(err)
    }
  },
  changeInfor: async (req, res) => {
    try {
      const id = req.user.id;
      let infor = req.body;
      let newUser = await User.findByIdAndUpdate(id, infor);
      let update = await User.findById(id)
      return res.status(200).json(update)
    }
    catch (err) {
      return res.status(500).json(err)
    }
  },
  changeAvatar: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const url = result.secure_url;
      const id = req.user.id;
      let update = await User.findByIdAndUpdate(id,
        { avatar: url }
      )
      let newuser = await User.findById(id)
      return res.status(200).json(newuser)
    }
    catch (err) {
      return res.status(500).json(err)
    }
  },
  requestRefreshToken: async (req, res) => {
    // Take refresh token
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is invalid")
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err)
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
      const newAccessToken = userController.generateAccessToken(user)
      const newRefreshToken = userController.generateRefreshToken(user)
      refreshTokens.push(newRefreshToken)
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false
      })
      res.status(200).json({ accessToken: newAccessToken })
    })
  },
};


module.exports = userController;
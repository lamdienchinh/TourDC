const { User } = require("../model/model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { cloudinary } = require('../utils/index.js')
var refreshTokens = []

const userController = {
  //ADD user
  addUser: async (req, res) => {

    try {
      const existingUser = await User.findOne({ email: req.body.email });
      const existingAddress = await User.findOne({ walletAddress: req.body.walletAddress });
      console.log(req.body)
      if (existingUser) {
        // Nếu email đã tồn tại, trả về mã lỗi 409 (Conflict) và thông báo lỗi
        console.log('Email đã tồn tại: ')
        console.log(existingUser)
        res.status(409).json({ message: 'Email đã tồn tại.' });
      }
      else if (existingAddress) {
        res.status(409).json({ message: 'Địa chỉ ví đã tồn tại.' });
      } else {
        const newUser = new User(req.body);
        const saveUser = await newUser.save();
        res.status(200).json(req.body);
      }
    } catch (error) {
      res.status(500).json(error);
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
  generateAccessToken: async (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin
      }, process.env.JWT_ACCESS_KEY,
      { expiresIn: "24h" }
    )
  },
  generateRefreshToken: async (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin
      }, process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    )
  },
  loginByMetamask: async (req, res) => {
    try {
      let user = await User.findOne(req.body).populate('vouchers');
      if (!user) {
        let newUser = new User(req.body);
        let addUser = await newUser.save();
        user = addUser;
      }
      const accessToken = await userController.generateAccessToken(user)
      const refreshToken = await userController.generateRefreshToken(user)
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
  login: async (req, res) => {
    try {
      const user = await User.findOne(req.body).populate('vouchers');
      const accessToken = await userController.generateAccessToken(user)
      const refreshToken = await userController.generateRefreshToken(user)
      refreshTokens.push(refreshToken)
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true
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
    try {
      let refreshToken = req.cookies.refreshToken;
      // Verify the refreshToken with the JWT_REFRESH_KEY
      const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);

      // Check if the refreshToken exists in the refreshTokens list
      if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json({ error: "Invalid refresh token" });
      }

      // Remove current refreshToken from refreshTokens list
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      // Create new accessToken, refreshToken
      const newAccessToken = jwt.sign(
        {
          id: user.id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "24h" }
      );

      const newRefreshToken = jwt.sign(
        {
          id: user.id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: "365d" }
      );

      // Add new refreshToken to refreshTokens list
      refreshTokens.push(newRefreshToken);

      // Send back the new refreshToken through cookie
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false, // Set it to true for a production environment with HTTPS
        sameSite: "strict",
      });

      // Send the new accessToken back to the client
      return res.status(200).json({ accessToken: newAccessToken });
    } catch (err) {
      console.log(err); // Log the error for debugging purposes
      return res.status(403).json({ error: "Invalid refresh token" });
    }
  },
};


module.exports = userController;
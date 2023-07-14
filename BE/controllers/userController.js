const { User } = require("../model/model");

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

  // GET ALL USERS
  // getAllUsers: async (req, res) => {
  //   try {
  //     const users = await User.find();
  //     res.status(200).json(users);
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // },
};


module.exports = userController;
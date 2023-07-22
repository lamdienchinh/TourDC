const { model } = require("mongoose");
const { Album, User } = require("../model/model")

const router = require("express").Router();

const albumController = {
  addAlbum: async (req, res) => {
    try {
      let temp = {
        ...req.body,
        user: req.user.id
      }
      const newAlbum = new Album(temp);
      const savedAlbum = await newAlbum.save();
      res.status(200).json(savedAlbum);
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getAlbums: async (req, res) => {
    try {
      let userid = req.user.id;
      const Trips = await Album.find({ user: userid }).populate(["user", "list_trips"]);
      res.status(200).json(Trips);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Fail' });
    }
  }
}

module.exports = albumController;
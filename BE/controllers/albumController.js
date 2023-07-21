const { model } = require("mongoose");
const { Album, User } = require("../model/model")

const router = require("express").Router();

const albumController = {
  addAlbum: async (req, res) => {
    try {
      const newAlbum = new Album(req.body);
      const savedAlbum = await newAlbum.save();
      res.status(200).json(savedAlbum);
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getAlbums: async (req, res) => {
    try {
      let userid = req.user.id;
      const Trips = await Album.find({ user: userid });
      res.status(200).json(Trips);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Fail' });
    }
  }
}

module.exports = albumController;
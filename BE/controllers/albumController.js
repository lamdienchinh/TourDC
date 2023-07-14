const { model } = require("mongoose");
const { Album, User}  = require("../model/model")

const router = require("express").Router();

const albumController = {
  addAlbum: async(req, res) => {
    try {
      const newAlbum = new Album(req.body);
      const savedAlbum = await newAlbum.save();
      res.status(200).json(savedAlbum);
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = albumController;
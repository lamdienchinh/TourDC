const { Place } = require("../model/model");


const placeController = {
    //ADD Place
    addPlace: async (req, res) => {
        try {
            let data = req.body;
            const newPlace = new Place(data);
            const savePlace = await newPlace.save();
            return res.status(200).json(savePlace);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    updatePlace: async (req, res) => {
        try {
            let id = req.body._id
            let newdata = req.body;
            const update = await Place.updateOne({ _id: id }, { $set: { ...newdata } });
            return res.status(200).json(update)
        }
        catch (error) {
            return res.status(500).json(error);
        }
    },
    getAllPlaces: async (req, res) => {
        try {
            const places = await Place.find().populate('referPlaces');
            return res.status(200).json(places)
        }
        catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },
    getPlace: async (req, res) => {
        try {
            let search = req.body.placeid;
            const place = await Place.findOne({ placeid: search }).populate("referPlaces");
            return res.status(200).json(place)
        }
        catch (error) {
            console.log(Error)
            return res.status(500).json(error)
        }
    },
    deletePlace: async (req, res) => {
        try {
            let placeDel = req.body._id;
            const delprocess = await Place.deleteOne({ _id: placeDel })
            return res.status(200).json(delprocess);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = placeController;
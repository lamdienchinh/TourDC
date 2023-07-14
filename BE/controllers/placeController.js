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
            return res.status(500).json(err);
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
            return res.status(500).json(err);
        }
    },
    getAllPlaces: async (req, res) => {
        try {
            const places = await Place.find();
            return res.status(200).json(places)
        }
        catch (error) {
            return res.status(500).json(err)
        }
    },
    getPlace: async (req, res) => {
        try {
            let search = req.body.name;
            const place = await Place.findOne({ name: search });
            return res.status(200).json(place)
        }
        catch (error) {
            return res.status(500).json(err)
        }
    },
    deletePlace: async (req, res) => {
        try {
            let placeDel = req.body._id;
            const delprocess = await Place.deleteOne({ _id: placeDel })
            return res.status(200).json(delprocess);
        }
        catch (error) {
            return res.status(500).json(err);
        }
    }
}

module.exports = placeController;
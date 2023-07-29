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
            const places = await Place.find().populate([
                'referPlaces',
                { path: 'trips', populate: { path: 'user' } }
            ]);
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
            const place = await Place.findOne({ placeid: search }).populate([
                'referPlaces',
                { path: 'trips', populate: { path: 'user' } }
            ]);
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
    },
    deleteTrip: async (req, res) => {
        try {
            // Lấy danh sách tất cả các place
            const places = await Place.find();

            // Duyệt qua danh sách place và xóa các trips trong mỗi place
            for (const place of places) {
                place.trips = []; // Gán mảng rỗng để xóa tất cả các trips
                await place.save(); // Lưu lại place sau khi xóa trips
            }

            return res.status(200).json({ message: 'Xóa tất cả các trips thành công' });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    getFourPlaces: async (req, res) => {
        try {
            // Lấy 4 địa điểm ngẫu nhiên từ cơ sở dữ liệu
            const randomPlaces = await Place.aggregate([{ $sample: { size: 4 } }]);

            return res.status(200).json(randomPlaces);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
}

module.exports = placeController;
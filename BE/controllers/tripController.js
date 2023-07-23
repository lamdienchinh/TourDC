const { cloudinary } = require('../utils/index.js')
const { Trip } = require('../model/model')

const tripController = {
    upload: async (req, res) => {
        const files = req.files;
        const uploadPromises = [];
        try {
            // Tải lên các tệp lên Cloudinary và thu thập các promise tải lên
            files.forEach(file => {
                uploadPromises.push(
                    new Promise((resolve, reject) => {
                        cloudinary.uploader.upload(file.path, (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result.secure_url);
                            }
                        });
                    })
                );
            });

            // Chờ cho tất cả các promise tải lên hoàn thành
            const uploadedUrls = await Promise.all(uploadPromises);

            const newTrip = new Trip({
                user: req.user.id,
                list_imgs: uploadedUrls,
                time: req.body.time,
                trHash: req.body.trHash,
                tripid: req.body.tripid,
                placeid: req.body.placeid
            });
            let result = await newTrip.save();
            console.log(files);
            // uploadedUrls chứa các liên kết ảnh đã tải lên từ Cloudinary
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Upload failed' });
        }
    },
    getTrips: async (req, res) => {
        try {
            let userid = req.user.id;
            const Trips = await Trip.find({ user: userid }).populate("user");
            res.status(200).json(Trips);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Fail' });
        }
    },
    getTripsofPlace: async (req, res) => {
        try {
            let place = req.body.placeid;
            const Trips = await Trip.find({ placeid: place }).populate("user");
            res.status(200).json(Trips);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Fail' });
        }
    },
    controlReaction: async (req, res) => {
        try {
            const { action } = req.body;
            const userId = req.user.id;

            if (action === "like" || action === "dislike") {
                const tripId = req.body.tripId; // Giả sử bạn có tham số trong URL là tripId để xác định trip cần thực hiện reaction
                const trip = await Trip.findById(tripId);

                if (!trip) {
                    return res.status(404).json({ message: "Trip not found" });
                }

                const userLikes = trip.like || [];
                const userDislikes = trip.dislike || [];

                // Kiểm tra xem người dùng đã có trong bên like hoặc dislike chưa
                const userInLikes = userLikes.includes(userId);
                const userInDislikes = userDislikes.includes(userId);

                if (action === "like") {
                    if (userInDislikes) {
                        // Nếu người dùng đã dislike thì xoá khỏi dislike trước khi thêm vào like
                        await Trip.findByIdAndUpdate(tripId, { $pull: { dislike: userId } });
                    }

                    if (!userInLikes) {
                        // Nếu người dùng chưa có trong like thì thêm vào
                        await Trip.findByIdAndUpdate(tripId, { $push: { like: userId } });
                    } else {
                        // Nếu người dùng đã có trong like thì xoá khỏi like
                        await Trip.findByIdAndUpdate(tripId, { $pull: { like: userId } });
                    }
                } else if (action === "dislike") {
                    if (userInLikes) {
                        // Nếu người dùng đã like thì xoá khỏi like trước khi thêm vào dislike
                        await Trip.findByIdAndUpdate(tripId, { $pull: { like: userId } });
                    }

                    if (!userInDislikes) {
                        // Nếu người dùng chưa có trong dislike thì thêm vào
                        await Trip.findByIdAndUpdate(tripId, { $push: { dislike: userId } });
                    } else {
                        // Nếu người dùng đã có trong dislike thì xoá khỏi dislike
                        await Trip.findByIdAndUpdate(tripId, { $pull: { dislike: userId } });
                    }
                }

                return res.status(200).json({ message: "Reaction updated successfully" });
            } else {
                return res.status(400).json({ message: "Invalid action" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }
};


module.exports = tripController;
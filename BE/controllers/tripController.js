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
                trHash: req.body.trHash
            });
            let result = await newTrip.save();
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
            const Trips = await Trip.find({ user: userid });
            res.status(200).json(Trips);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Fail' });
        }
    },
};


module.exports = tripController;
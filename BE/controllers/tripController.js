const { cloudinary } = require('../utils/index.js')

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

            // uploadedUrls chứa các liên kết ảnh đã tải lên từ Cloudinary
            res.json(uploadedUrls);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Upload failed' });
        }
    },
};


module.exports = tripController;
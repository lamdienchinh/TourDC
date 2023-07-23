const { Post, Comment } = require("../model/model");


const postController = {
    //ADD Place
    addPost: async (req, res) => {
        try {
            let data = req.body;
            data = {
                ...data,
                user: req.user.id
            }
            const newPost = new Post(data);
            const savePost = await newPost.save();
            return res.status(200).json(savePost);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getPosts: async (req, res) => {
        try {
            const posts = await Post.find().populate([
                'user',
                'albums',
                'like',
                'dislike',
                { path: 'comment', populate: { path: 'user' } }, // Populate trường user trong trường comment
            ]);
            return res.status(200).json(posts)
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    controlReaction: async (req, res) => {
        try {
            const { action } = req.body;
            const userId = req.user.id;

            if (action === "like" || action === "dislike") {
                const postid = req.body.postid; // Giả sử bạn có tham số trong URL là tripId để xác định trip cần thực hiện reaction
                const post = await Post.findById(postid);

                if (!post) {
                    return res.status(404).json({ message: "Trip not found" });
                }

                const userLikes = post.like || [];
                const userDislikes = post.dislike || [];

                // Kiểm tra xem người dùng đã có trong bên like hoặc dislike chưa
                const userInLikes = userLikes.includes(userId);
                const userInDislikes = userDislikes.includes(userId);

                if (action === "like") {
                    if (userInDislikes) {
                        // Nếu người dùng đã dislike thì xoá khỏi dislike trước khi thêm vào like
                        await Post.findByIdAndUpdate(postid, { $pull: { dislike: userId } });
                    }

                    if (!userInLikes) {
                        // Nếu người dùng chưa có trong like thì thêm vào
                        await Post.findByIdAndUpdate(postid, { $push: { like: userId } });
                    } else {
                        // Nếu người dùng đã có trong like thì xoá khỏi like
                        await Post.findByIdAndUpdate(postid, { $pull: { like: userId } });
                    }
                } else if (action === "dislike") {
                    if (userInLikes) {
                        // Nếu người dùng đã like thì xoá khỏi like trước khi thêm vào dislike
                        await Post.findByIdAndUpdate(postid, { $pull: { like: userId } });
                    }

                    if (!userInDislikes) {
                        // Nếu người dùng chưa có trong dislike thì thêm vào
                        await Post.findByIdAndUpdate(postid, { $push: { dislike: userId } });
                    } else {
                        // Nếu người dùng đã có trong dislike thì xoá khỏi dislike
                        await Post.findByIdAndUpdate(post, { $pull: { dislike: userId } });
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
    },
    //ADD Place
    comment: async (req, res) => {
        try {
            let data = req.body;
            data = {
                ...data,
                user: req.user.id,
            };
            const newComment = new Comment(data);
            const savedComment = await newComment.save();

            // Lấy id của comment mới được lưu
            const commentId = savedComment._id;

            // Thêm commentId vào trường comments của Post
            const postId = req.body.postid;
            await Post.findByIdAndUpdate(postId, {
                $push: { comment: commentId },
            });
            const result = await Comment.findById(commentId).populate("user");
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
}

module.exports = postController;
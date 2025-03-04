import Posts from "../models/postModel.js";
import Users from "../models/userModel.js";
import Comments from './../models/commentModel.js';


export const createPost = async (req, res) => {
    try {
        const { content, images } = req.body;

        const newPost = new Posts({
            content,
            images,
            user: req.user._id
        })

        await newPost.save();

        return res.status(200).json({
            msg: "Post Saved successfully",
            newPost: {
                ...newPost._doc,
                user: req.user,
            }
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const getPost = async (req, res) => {
    try {
        const posts = await Posts.find().sort("-createdAt").populate("user likes", "username avatar fullname friends").populate({ path: "comments", populate: { path: "user likes", select: "-password" } })

        if (!posts) {
            return res.status(500).json({ msg: "No post found" });
        }

        return res.status(200).json({
            msg: "Post found",
            result: posts.length,
            posts,
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

export const updatePost = async (req, res) => {
    try {
        const { content, images } = req.body;

        const post = await Posts.findOneAndUpdate({ _id: req.params.id }, {
            content, images
        }).populate("user likes", "username avatar fullname")

        if (!post) {
            return res.status(500).json({ msg: "No post found" });
        }

        return res.status(200).json({
            msg: "Post Updated",
            newPost: {
                ...post._doc,
                content, images,
            }
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const likePost = async (req, res) => {
    try {
        const post = await Posts.find({ _id: req.params.id, likes: req.user._id })

        if (post.length > 0) {
            return res.status(400).json({ msg: "You have already like this post" });
        }

        const like = await Posts.findOneAndUpdate({ _id: req.params.id }, {
            $push: { likes: req.user._id }
        }, { new: true });

        if (!like) {
            return res.status(500).json({ msg: "No post found" });
        }

        return res.json({ msg: "Post Liked" });
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const unLikePost = async (req, res) => {
    try {
        const unlike = await Posts.findOneAndUpdate({ _id: req.params.id }, {
            $pull: { likes: req.user._id }
        }, { new: true });

        if (!unlike) {
            return res.status(500).json({ msg: "No post found" });
        }

        return res.json({ msg: "Post Like Removed" });
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const posts = await Posts.find({user: req.params.id}).sort("-createdAt").populate("user likes", "username avatar fullname").populate({ path: "comments", populate: { path: "user likes", select: "-password" } })

        if (!posts) {
            return res.status(500).json({ msg: "No post found 44" });
        }
        
        return res.status(200).json({ 
            msg: "Post found",
            result: posts.length,
            posts,
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

export const getSinglePost = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id).populate("user likes", "username avatar fullname friends").populate({ path: "comments", populate: { path: "user likes", select: "-password" } })

        if (!post) {
            return res.status(400).json({ msg: "No post found" });
        }

        return res.status(200).json({
            post,
        })
    } catch (err) {
        return res.status(500).json({ msg: "err.message" });
    }
}

export const savePost = async (req, res) => {
    try {
        const user = await Users.find({ _id: req.user._id, saved: req.params.id })

        if (user.length > 0) {
            return res.status(400).json({ msg: "You have already save this post" });
        }

        await Users.findOneAndUpdate({ _id: req.user._id }, {
            $push: { saved: req.params.id }
        }, { new: true });

        return res.json({ msg: "Post Saved" });
    } catch (err) {
        return res.status(500).json({ msg: "err.message" });
    }
}

export const unSavePost = async (req, res) => {
    try {
        await Users.findOneAndUpdate({ _id: req.user._id }, {
            $pull: { saved: req.params.id }
        }, { new: true });

        return res.json({ msg: "Post Unsaved" });
    } catch (err) {
        return res.status(500).json({ msg: "err.message" });
    }
}

export const getSavedPost = async (req, res) => {
    try {
        const savedPosts = await Posts.find({ _id: {$in: req.user.saved} }).sort("-createdAt").populate("user likes", "username avatar fullname");

        if (!savedPosts) {
            return res.status(400).json({ msg: "No post found" });
        }

        return res.json({
            msg: "Something",
            savedPosts
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Posts.findOneAndDelete({_id: req.params.id, user: req.user._id});
        const comments = await Comments.deleteMany({_id: {$in: post.comments}})

        return res.json({
            msg: "Post deleted",
            newPost: {
                ...post,
                user: req.user,
            }
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const postCounter = async (req, res) => {
    try {
        const { userId } = req.params;
        const postCount = await Posts.countDocuments({ user: userId });
        res.json({ postCount });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
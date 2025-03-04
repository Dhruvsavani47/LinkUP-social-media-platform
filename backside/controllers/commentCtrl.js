import Comments from "../models/commentModel.js";
import Posts from "../models/postModel.js";


export const createComment = async (req, res) => {
    try {
        const { content, postId, tag, reply, postUserId } = req.body;

        const postc = await Posts.findById(postId);

        if(!postc){
            return res.status(400).json({ msg: "No post found" });
        }

        const userId = req.user._id;
        const newComment = await new Comments({
            user: userId,
            content,
            tag: tag || null,
            reply: reply ? reply : null,
            postUserId,
            postId
        })

        const post = await Posts.findOneAndUpdate({_id: postId}, {
            $push: {comments: newComment._id}
        })

        await newComment.save();

        return res.json({newComment});
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const updateComment = async (req, res) => {
    try {
        const { content } = req.body;

        await Comments.findOneAndUpdate({_id: req.params.id, user: req.user._id}, {content})

        return res.json({msg: "Update Successfully"});
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const likeComment = async (req, res) => {
    try {
        const comment = await Comments.find({ _id: req.params.id, likes: req.user._id })

        if (comment.length > 0) {
            return res.status(400).json({ msg: "You have already like this comment" });
        }

        await Comments.findOneAndUpdate({ _id: req.params.id }, {
            $push: { likes: req.user._id }
        }, { new: true });

        return res.json({ msg: "Comment Liked" });
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const unlikeComment = async (req, res) => {
    try {
        await Comments.findOneAndUpdate({ _id: req.params.id }, {
            $pull: { likes: req.user._id }
        }, { new: true });

        return res.json({ msg: "Comment Like Removed" });
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comments.findOneAndDelete({
            _id: req.params.id,
            $or: [
                {postUserId: req.user._id},
                {user: req.user._id}
            ]
        })

        const post = await Posts.findOneAndUpdate({_id: comment.postId}, {
            $pull: {comments: req.params.id}
        })

        res.json({
            msg: "comment deleted"
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
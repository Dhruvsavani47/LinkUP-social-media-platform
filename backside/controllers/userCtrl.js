import Users from '../models/userModel.js';
import mongoose from 'mongoose';

export const searchUser = async (req, res) => {
    try {
        // const username = String(req.query.username).trim();

        // if (!username || typeof username !== "string") {
        //     return res.status(400).json({ msg: "Invalid username query" });
        // }

        const users = await Users.find({
            username: { $regex: req.query.username }
        }).select("fullname username avatar");

        if (users.length === 0) {
            return res.json({ msg: "No users found" });
        }

        res.json({ users });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await Users.findOne({ _id: req.params.id }).populate("friends following", "-password");

        if (!user) {
            return res.status(400).json({ msg: "No user Exists" });
        }

        res.json({ user });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

// export const getRandomUser = async (req, res) => {
//     try {
//         const randomUsers = await Users.aggregate([
//             { $sample: { size: 7 }}
//         ]).exec();

//         const populatedUsers = await Users.populate(randomUsers, { 
//             path: "friends following", 
//             select: "-password" 
//         });

//         if (!populatedUsers.length) {
//             return res.status(400).json({ msg: "No users exist" });
//         }

//         res.json({ randomUsers: populatedUsers });
//     } catch (err) {
//         return res.status(500).json({ msg: err.message });
//     }
// }

export const getRandomUser = async (req, res) => {
    try {
        const userId = req.user.id; 
        const currentUser = await Users.findById(userId).select("following");

        if (!currentUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        const randomUsers = await Users.aggregate([
            { 
                $match: { 
                    _id: { $nin: [...currentUser.following, userId] }
                }
            },
            { $sample: { size: 8 }}
        ]);

        const populatedUsers = await Users.populate(randomUsers, {
            path: "friends following",
            select: "-password" 
        });

        if (!populatedUsers.length) {
            return res.status(400).json({ msg: "No new users available" });
        }

        res.json({ randomUsers: populatedUsers });

    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { website, fullname, story, phone, address, avatar } = req.body;

        if (!fullname) {
            return res.status(500).json({ msg: "Fullname is requires" });
        }

        const user = await Users.findOneAndUpdate({ _id: req.user._id }, {
            website, fullname, story, phone, address, avatar
        })

        res.json({ msg: "Update Successfully", user });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

export const friend = async (req, res) => {
    try {
        const user = await Users.find({ _id: req.params.id, friends: req.user._id })

        if (user.length > 0) {
            return res.status(400).json({ msg: "You have already followed" });
        }

        const newUser = await Users.findOneAndUpdate({ _id: req.params.id }, {
            $push: { friends: req.user._id }
        }, { new: true }).populate("friends following", "-password");

        await Users.findOneAndUpdate({ _id: req.user._id }, {
            $push: { following: req.params.id }
        }, { new: true });

        res.json({newUser});
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

export const unfriend = async (req, res) => {
    try {
        const newUser = await Users.findOneAndUpdate({ _id: req.params.id }, {
            $pull: { friends: req.user._id }
        }, { new: true }).populate("friends following", "-password");

        await Users.findOneAndUpdate({ _id: req.user._id }, {
            $pull: { following: req.params.id }
        }, { new: true });

        res.json({newUser});
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}
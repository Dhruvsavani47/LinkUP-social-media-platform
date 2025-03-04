import Notifies from "../models/notifyModel.js";


export const createNotify = async (req, res) => {
    try {
        const { id, recipients, url, content, image, text, isRead } = req.body;

        if(recipients.includes(req.user._id.toString())){
            return;
        }

        const notify = await new Notifies({
            id,
            recipients,
            url,
            content,
            image,
            text,
            isRead,
            user: req.user,
        })

        await notify.save();

        return res.json({notify});
    } catch (err) {
        return res.status(400).json({msg: err.message})
    }
}

export const removeNotify = async (req, res) => {
    try {
        const notify = await Notifies.findOneAndDelete({
            id: req.params.id,
            url: req.query.url
        })

        return res.json({notify});
    } catch (err) {
        return res.status(400).json({msg: err.message})
    }
}

export const getNotify = async (req, res) => {
    try {
        const notifies = await Notifies.find({
            recipients: req.user._id
        }).sort("-isRead -createdAt").populate("user", "avatar fullname username");

        return res.json({notifies});
    } catch (err) {
        return res.status(400).json({msg: err.message})
    }
}

export const isReadNotify = async (req, res) => {
    try {
        const notifies = await Notifies.findOneAndUpdate({
            _id: req.params.id
        }, { isRead: true })

        return res.json({notifies});
    } catch (err) {
        return res.status(400).json({msg: err.message})
    }
}

export const deleteAllNotifies = async (req, res) => {
    try {
        const notifies = await Notifies.deleteMany({
            recipients: req.user._id
        })

        return res.json({notifies});
    } catch (err) {
        return res.status(400).json({msg: err.message})
    }
}
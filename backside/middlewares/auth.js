import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";


const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")
    if (!token) {
      return res.status(500).json({ msg: "Not Valid" });
    }

    const decoded = jwt.verify(token, process.env.ACCESSTOKENSECRET);
    if (!decoded) {
      return res.status(500).json({ msg: "Not Valid !!!" });
    }

    const user = await Users.findOne({ _id: decoded.id })
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

export default auth

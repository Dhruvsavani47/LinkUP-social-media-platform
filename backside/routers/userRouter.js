import express from 'express';
import auth from "../middlewares/auth.js";
import { searchUser, getUser, updateUser, friend, unfriend, getRandomUser } from "../controllers/userCtrl.js"

const router = express.Router();

router.get('/search', auth, searchUser);
router.get('/user/:id', auth, getUser);
router.get('/randomuser', auth, getRandomUser);
router.patch('/user', auth, updateUser);
router.patch('/user/:id/friend', auth, friend);
router.patch('/user/:id/unfriend', auth, unfriend);

export default router;
import express from 'express';
import auth from "../middlewares/auth.js";
import { createComment, deleteComment, likeComment, unlikeComment, updateComment } from '../controllers/commentCtrl.js';

const router = express.Router();

router.post('/comment', auth, createComment);
router.patch('/comment/:id', auth, updateComment);
router.patch('/comment/:id/like', auth, likeComment);
router.patch('/comment/:id/unlike', auth, unlikeComment);
router.delete('/comment/:id', auth, deleteComment);

export default router;
import express from 'express';
import auth from "../middlewares/auth.js";
import { createPost, deletePost, getPost, getSavedPost, getSinglePost, getUserPosts, likePost, savePost, unLikePost, unSavePost, updatePost, postCounter } from '../controllers/postCtrl.js';
import Posts from '../models/postModel.js';

const router = express.Router();

router.route('/posts')
    .post(auth, createPost)
    .get(auth, getPost)

router.route('/post/:id')
    .patch(auth, updatePost)
    .get(auth, getSinglePost)
    .delete(auth, deletePost);

router.patch('/post/:id/like', auth, likePost);
router.patch('/post/:id/unlike', auth, unLikePost);
router.get('/userposts/:id', auth, getUserPosts);
router.patch('/save/:id', auth, savePost);
router.patch('/unsave/:id', auth, unSavePost);
router.get('/savedpostget', auth, getSavedPost);
router.get("/user/:userId/posts/count", postCounter);

export default router;
import express from 'express';
import auth from "../middlewares/auth.js";
import { createNotify, deleteAllNotifies, getNotify, isReadNotify, removeNotify } from '../controllers/notifyCtrl.js';

const router = express.Router();

router.post('/notify', auth, createNotify);
router.delete('/notify/:id', auth, removeNotify);
router.get('/notifies', auth, getNotify);
router.patch('/isreadnotify/:id', auth, isReadNotify);
router.delete('/deleteallnotify', auth, deleteAllNotifies);

export default router;
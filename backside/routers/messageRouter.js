import express from 'express';
import auth from "../middlewares/auth.js";
import { createMessage, deleteMessages, getConversations, getMessages } from '../controllers/messageCtrl.js';

const router = express.Router();

router.post('/message', auth, createMessage);
router.get('/conversations', auth, getConversations);
router.get('/message/:id', auth, getMessages);
router.delete('/message/:id', auth, deleteMessages);

export default router;
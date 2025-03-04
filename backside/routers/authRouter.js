import express from 'express';
import { register, login, logout, generateAccessToken } from '../controllers/authCtrl.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh_token', generateAccessToken);

export default router;
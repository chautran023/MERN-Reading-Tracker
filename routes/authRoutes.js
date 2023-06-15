import express from 'express'
const router = express.Router()
import authenticateUser from '../middleware/auth.js'
import testUser from '../middleware/testUser.js'
import { register, login, updateUser, getCurrentUser, logout } from '../controllers/authController.js'

import rateLimiter from 'express-rate-limit'
const apiLimiter = rateLimiter({
    windowMs: 15 * 1000 * 60, // 15 minutes
    max: 100,
    message: 'Too many requests from this IP address, please try again after 15 minutes.',
})

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
router.route('/logout').get(logout);
router.route('/updateUser').patch(authenticateUser, testUser, updateUser);
//after refresh, we send out a request to get current user, if it's not valid send back 401
router.route('/getCurrentUser').get(authenticateUser, getCurrentUser);

export default router;

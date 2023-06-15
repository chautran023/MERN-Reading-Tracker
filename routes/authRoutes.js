import express from 'express'
const router = express.Router()
import authenticateUser from '../middleware/auth.js'
import testUser from '../middleware/testUser.js'
import { register, login, updateUser } from '../controllers/authController.js'

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser').patch(authenticateUser, testUser, updateUser);

export default router;

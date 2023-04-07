import express from 'express'
// USING MIDDLEWARE PACKAGE TO LIMIT NUMBER OF REQUESTS TO MAKE TO THE REGISTER & LOGIN ROUTES 
import rateLimiter from 'express-rate-limit';
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

import { 
  register, 
  login, 
  updateUser, 
  getCurrentUser, 
  logout 
} from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'
import testUser from '../middleware/testUser.js'

const router =  express.Router();

router.post('/register', apiLimiter, register);
router.post('/login', apiLimiter, login);
router.patch('/updateUser', authenticateUser, testUser, updateUser);
router.get('/getCurrentUser', authenticateUser, getCurrentUser);
router.get('/logout', logout);

// OTHER METHOD OF DEFINING ROUTES
// router.route('/register').post(register);
// router.route('/login').post(login);
// router.route('/updateUser').patch(updateUser);

export default router;
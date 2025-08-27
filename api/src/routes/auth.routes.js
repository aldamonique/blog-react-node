const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validateRegister } = require('../validators/auth');


router.post('/register', validateRegister, authController.register);
router.post('/login', authController.login);
router.get('/profile', authMiddleware, authController.profile);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);


module.exports = router;
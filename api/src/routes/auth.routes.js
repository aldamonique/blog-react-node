const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { validateRegister } = require('../validators/auth');


router.post('/register', validateRegister, authController.register);
router.post('/login', authController.login);
router.get('/profile', authMiddleware, authController.profile);
router.post('/logout', authController.logout);

module.exports = router;
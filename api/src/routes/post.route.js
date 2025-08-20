const express = require('express');
const multer = require('multer');
const router = express.Router();
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const uploadMiddleware = require('../middlewares/upload.middleware');
const upload = multer({ dest: 'uploads/' });

router.post('/post', authMiddleware, upload.single('file'), postController.createPost);
router.put('/post/:id', authMiddleware, uploadMiddleware.single('file'), postController.updatePost);
router.get('/post', postController.getPosts);
router.get('/post/:id', postController.getPostsById);

module.exports = router;
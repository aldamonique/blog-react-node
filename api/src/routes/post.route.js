const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const uploadMiddleware = require('../middlewares/upload.middleware');

router.post('/post', authMiddleware, uploadMiddleware.single('file'), postController.createPost);
router.put('/post/:id', authMiddleware, uploadMiddleware.single('file'), postController.updatePost);
router.get('/post', postController.getPosts);
router.get('/post/:id', postController.getPostsById);

module.exports = router;
require('dotenv').config(); 

const mongoose = require('mongoose');
const Post = require('../src/models/post.model.js'); 

const {MONGO_URI} = process.env;

const DEFAULT_IMAGE_PATH = 'uploads/cover-base.avif';
const OLD_IMAGE_PATH = 'uploads/cover-base.jpg';

async function setDefaultImage() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const filter = {
        cover: OLD_IMAGE_PATH
      
    };


    const update = {
      $set: { cover: DEFAULT_IMAGE_PATH }
    };

    const result = await Post.updateMany(filter, update);


  } catch (error) {
    console.error( error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection is closed');
  }
}

setDefaultImage();
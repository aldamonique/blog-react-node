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

    console.log('Procurando e atualizando posts sem imagem...');
    const result = await Post.updateMany(filter, update);

    console.log('-----------------------------------------');
    console.log('Operação concluída!');
    console.log(`${result.matchedCount} posts foram encontrados com a condição.`);
    console.log(`${result.modifiedCount} posts foram atualizados com a imagem padrão.`);
    console.log('-----------------------------------------');

  } catch (error) {
    console.error('Ocorreu um erro durante a operação:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Conexão com o MongoDB fechada.');
  }
}

setDefaultImage();
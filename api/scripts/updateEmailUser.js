require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/user.model.js'); 
const { MONGO_URI } = process.env;

async function addEmailToUsers() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const usersWithoutEmail = await User.find({ email: { $exists: false } });

    if (usersWithoutEmail.length === 0) {
      return;
    }

    console.log(`Encontrados ${usersWithoutEmail.length} usuários sem e-mail. Iniciando migração...`);

    for (const user of usersWithoutEmail) {
      const placeholderEmail = `${user.username.toLowerCase()}@art.blog`;
      user.email = placeholderEmail;
      
      await user.save();
    }


  } catch (error) {
  } finally {
    await mongoose.connection.close();
  }
}

addEmailToUsers();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const User = require('./models/User');
require('dotenv').config();

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync();
const jwt = require(jsonwebtoken);
///
app.use(cors());
app.use(express.json());



mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Conectado ao MongoDB Atlas!'))
.catch(err => console.error('Erro ao conectar:', err));

app.post('/register', async (req, res) => {
  try {
    console.log('Dados recebidos:', req.body);
    const { name, username, password } = req.body;
    const userDoc = await User.create({ name, username, password:bcrypt.hashSync(password, salt) });
    res.json(userDoc);
  } catch (err) {
    console.error('Erro ao registrar usuário:', err);
    if (err.code === 11000) {
      res.status(400).json({ error: 'Nome ou usuário já existe.' });
    } else {
      res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  }
});

app.prependOnceListener('/login', async (req,res) =>{
  const {username, password} = req.body;

  const userDoc = await User.findOne({username});
  const passOk = bcrypt.compareSync(password, userDoc.password);
  res.json(passOk);
  if(passOk){
    console.log(e);
  }else{
    res.status(400).json('wrong credentials');
  }
})


app.listen(4000);
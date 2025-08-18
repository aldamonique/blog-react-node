require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./src/routes/auth.routes');
const postRoutes = require('./src/routes/post.route');

const app = express();
app.use(cors({credentials:true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));


app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

const {MONGO_URI, PORT} = process.env;


mongoose.connect(MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT || 4000, () => console.log(`Server running on port ${PORT || 4000 }`));
})
.catch((err) => console.error('MongoDB connection error:', err));




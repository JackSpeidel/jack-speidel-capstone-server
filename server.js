// Initialize
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const postsRoute = require('./routes/postsRoute');
// const articlesRoute = require('.routes/articlesRoute');
const port = process.env.PORT || 5050;

// Middleware
app.use(express.json());
app.use(cors());

// Routing
app.use('/api/users', userRoute);
// app.use('/api/articles', articlesRoute);
app.use('/api/posts', postsRoute);

// Listen - Keep at Bottom
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
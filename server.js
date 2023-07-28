// Initialize
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5050;
const cors = require('cors');
const userRoute = require('./routes/userRoute');

// Middleware
app.use(express.json());
app.use(cors());

// Routing
app.use('/api/users', userRoute);


// Listen - Keep at Bottom
app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
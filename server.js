// Initialize
const express = require('express');
const app = express();
const dotenv = require('dotenv')
const port = process.env.PORT || 5050;
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());


// Listen - Keep at Bottom
app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
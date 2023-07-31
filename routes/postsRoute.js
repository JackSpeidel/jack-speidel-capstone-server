const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'));


// get /api/posts
// get all posts
router.get('/', async (req, res) => {
    console.log(req.body);
})
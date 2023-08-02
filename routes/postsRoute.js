const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'));
const jwt = require('jsonwebtoken');

// post /api/posts/post
router.post('/post', async (req, res) => {
    
    console.log('endpoint hit')

    if(!req.headers.authorization) {
        return res.status(401).send('Please login to comment');
    }
    
    const authHeader = req.headers.authorization;
    const authToken = authHeader.split(" ")[1];
    const decoded = jwt.verify(authToken, process.env.JWT_KEY);
    const userId = decoded.id;
    console.log({authToken, decoded, userId});

    const { title, content, user_id } = req.body;

    const newPost = {
        title,
        content,
        user_id: userId,
    };

    try {
        await knex('posts').insert(newPost);
        res.status(201).send(`Post successful: ${newPost}`)
    } catch (error) {
        console.log(error);
        res.status(400).send('Post failed.')
    }
})

// get /api/posts/
// get all posts
router.get('/', async (req, res) => {

    res.status(200).send(
        await knex('posts').join('users', 'users.id', '=', 'posts.user_id').select('posts.*', 'users.first_name', 'users.last_name', 'users.user_photo')
    );

})





module.exports = router;
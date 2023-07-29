const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// post /api/users/register
// user registration
router.post('/register', async (req, res) => {
    // deconstruct data from the user request
    const { first_name, last_name, email, password } = req.body;

    // info entry validation
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).send('Please enter the required fields.');
    }

    // creates encrypted password
    const hashedPassword = bcrypt.hashSync(password);

    // creates the new user
    const newUser = {
        first_name,
        last_name,
        email,
        password: hashedPassword
    };

    // connects user info to database
    try {
        await knex('users').insert(newUser);
        res.status(201).send('Registered successfully');
    } catch (error) {
        console.log(error);
        res.status(400).send('Failed registration');
    }
});

// post /api/users/login
// login & JWT response
router.post('/login', async (req, res) => {
    // deconstruct data from the user request
    const { email, password } = req.body;

    // user validation
    if(!email || !password) {
        return res.status(400).send('Please enter your information into the required fields');
    }

    // find the user in the database
    const user = await knex('users').where({email: email}).first();
    if (!user) {
        return res.status(400).send('Invalid email. Please try again or register as a new user.');
    }

    // password validation
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if(!isPasswordCorrect) {
        return res.status(400).send('Invalid password. Please try again.');
    }

    // generate a JWT token for user
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_KEY,
        { expiresIn: '36h' }
    );

    res.json({ token });
});

// post /api/users/current
// get request on logged-in user

router.get ('/current', async (req, res) => {
    // headers/jwt validation
    if(!req.headers.authorization) {
        return res.status(401).send('Please login to view page');
    }

    // parse the bearer token
    const authHeader = req.headers.authorization;
    const authToken = authHeader.split(" ")[1];

    // token verification
    try {
        const decoded = jwt.verify(authToken, process.env.JWT_KEY);

        // when verified, respond with user data
        const user = await knex('users').where({ id: decoded.id }).first();
        delete user.password;
        res.json(user);
    } catch (error) {
        return res.status(401).send('Invalid auth token')
    }
});

module.exports = router;
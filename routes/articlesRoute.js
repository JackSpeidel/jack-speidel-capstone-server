const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'));
const jwt = require('jsonwebtoken');

router.get('/')
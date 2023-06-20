const { Router } = require('express');
const { createUser, getAllUsers, loginUser } = require('./services/users.service');
const { createTweet } = require('./services/tweets.service');

const router = Router();

// create a user
router.post('/users', createUser);

// login a user
router.post('/users/login', loginUser);

// get all users
router.get('/users', getAllUsers);

// create a tweet
router.post('/users/:id/tweets', createTweet);

module.exports = router;

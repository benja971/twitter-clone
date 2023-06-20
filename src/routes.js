const { Router } = require('express');
const { createUser, getAllUsers, loginUser } = require('./services/users.service');
const { createTweet, getFeed} = require('./services/tweets.service');
const {createRelationship} = require('./services/relationships.service');

const router = Router();

// create a user
router.post('/users', createUser);

// login a user
router.post('/users/login', loginUser);

// get all users
router.get('/users', getAllUsers);

// create a tweet
router.post('/users/:id/tweets', createTweet);

// create a relationship
router.get('/users/:id/follow/:followed_id', createRelationship);

// get the feed of a user
router.get('/users/:id/feed', getFeed);

module.exports = router;

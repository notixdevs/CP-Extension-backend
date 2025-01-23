const express = require('express');
const router = express.Router();

const {getContestsWithCache} = require('../controllers/contest-controller');

router.get('/contests', getContestsWithCache);

module.exports = router;

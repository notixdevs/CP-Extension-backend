const express = require('express');
const router = express.Router();

const getContests = require('../controllers/contest-controller');

router.get('/', (req, res) => {
    res.send("Users route works");
});

router.get('/contests', getContests);

module.exports = router;

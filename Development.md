Replace this in contest-controller.js

``` js
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const NodeCache = require('node-cache');
const { fetchContests } = require('../helper-functions/functions');

// Handle TTL manually
const cache = new NodeCache({ stdTTL: 0 });

const contestFilePath = path.join(__dirname, '../contestData.json');

// Function to refresh contests data in the cache
const refreshCache = () => {
    try {
        const rawData = fs.readFileSync(contestFilePath);
        const contests = JSON.parse(rawData);
        cache.set('contests', contests);
        console.log('Contests data updated in cache.');
    } catch (error) {
        console.error('Error refreshing contests data:', error.message);
    }
};

// Watch for changes in contestData.json
fs.watchFile(contestFilePath, (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
        console.log('Detected change in contestData.json. Refreshing cache...');
        refreshCache();
    }
});

// Fetch contests with cache
const getContestsWithCache = async (req, res) => {
    try {
        const cachedData = cache.get('contests');
        if (cachedData) {
            console.log('Serving contests from cache.');
            return res.json(cachedData);
        }

        // Fetch contests if cache is empty
        console.log('Cache is empty. Fetching contests...');
        const contests = await fetchContests();
        cache.set('contests', contests);
        res.json(contests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Initial cache population
refreshCache();

module.exports = { getContestsWithCache };
```
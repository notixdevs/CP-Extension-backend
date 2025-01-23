require('dotenv').config();

const NodeCache = require('node-cache');
const { fetchContests } = require('../helper-functions/functions');

// Handle TTL manually
const cache = new NodeCache({ stdTTL: 0 });

// Function to refresh contests data in the cache
const refreshCache = async () => {
    try {
        const contests = await fetchContests();
        cache.set('contests', contests);
        console.log('Contests data updated in cache.');
    } catch (error) {
        console.error('Error refreshing contests data:', error.message);
    }
};

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

refreshCache();
setInterval(refreshCache, process.env.TIME);

module.exports = { getContestsWithCache };

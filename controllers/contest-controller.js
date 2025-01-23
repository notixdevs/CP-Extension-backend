const {fetchContests} = require('../helper-functions/functions');

const getContests = async (req,res) => {
    try {
        const contests = await fetchContests();
        res.json(contests);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

module.exports = getContests;
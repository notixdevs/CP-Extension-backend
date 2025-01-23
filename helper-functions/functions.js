require('dotenv').config();
const axios = require('axios');

const fetchContests = async () => {
    const currentDate = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(currentDate.getDate() + 7);

    const startDate = currentDate.toISOString().slice(0, 19);
    const endDate = oneWeekLater.toISOString().slice(0, 19);

    const apiUrl = `https://clist.by/api/v4/contest/?upcoming=true&start__gte=${startDate}&start__lte=${endDate}&username=${process.env.USER_ID}&api_key=${process.env.API_KEY}&order_by=start`;

    try {
        const response = await axios.get(apiUrl);
        return response.data.objects;
    } catch (error) {
        console.error('Error fetching contests:', error.message);
        throw new Error('Could not fetch contests.');
    }
};

module.exports = { fetchContests };

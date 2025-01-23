require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const contestRoutes = require('./routes/contest-routes');

app.get('/healthz',(req,res)=>{
    res.send("Healthy");
});

app.use('/api', contestRoutes);


app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});
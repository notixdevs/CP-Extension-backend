require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send("working");
});

app.listen(PORT,(err)=>{
    try{
        console.log(`Server running on ${PORT}`);
    }catch(err){
        console.log(err);
    }
});
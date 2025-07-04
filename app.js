require('dotenv').config();

const express = require('express');
const app = express();
const axios = require('axios');
const cors  = require('cors');

app.use(express.json());

const corsOptions = {
  origin: function (origin, callback) {
      if (!origin || origin.startsWith("chrome-extension://")) {
          callback(null, true);
      } else {
          callback(new Error("Not allowed by CORS"));
      }
  },
  methods: "GET",
  allowedHeaders: ["Content-Type", "Pragma", "Cache-Control"]
};

app.use(cors(corsOptions));




const PORT = process.env.PORT || 3000;
const contestRoutes = require('./routes/contest-routes');

app.get('/healthz',(req,res)=>{
    console.log("Health Check")
    res.send("Healthy connection");
});

app.use('/api', contestRoutes);


const url = `https://cp-extension-backend.onrender.com/healthz`;
const interval = 300000;

function reloadWebsite() {
  axios.get(url)
    .then(response => {
    //   console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
    })
    .catch(error => {
      console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
    });
}


setInterval(reloadWebsite, interval);


app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});


const express = require('express');
const axios = require('axios');
const cors = require('cors')
const app = express();
require('dotenv').config();
const port = process.env.PORT ;

const apiKey = process.env.API_KEY;

app.use(express.json());
app.use(cors());
app.get('/api/weather/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    res.json(weatherData.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.use('/',(req,res)=>{
  res.send("server is running")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

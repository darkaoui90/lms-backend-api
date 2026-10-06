const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();


app.use(express.json());


const courseRoutes = require('./routes/courseRoutes');


app.use('/api/courses', courseRoutes);

app.get('/', (req, res) => {
    res.send('LMS API is running...');
});


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log(' Connected to MongoDB successfully!');
        
       
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(` Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(' Error connecting to MongoDB:', error.message);
    });
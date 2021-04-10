const http = require('http');
const express = require('express');
// const app = require('./API');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

const patientRoutes = require('./routes/patient');
const doctorRoutes = require('./routes/doctor');
const verifyToken = require('./routes/verifyToken');

app.get('/', (req, res) => {
  res.send("Welcome to hopital+");
})

app.get('/patient/profile', verifyToken, (req, res) => {
  res.send('This is the patient profile');
})

app.get('/doctor/profile', verifyToken, (req, res) => {
  res.send('This is the doctor profile');
})

app.use('/patient', patientRoutes);
app.use('/doctor', doctorRoutes);

mongoose.connect('mongodb+srv://svc-vc-mongodb:0cSUyhHjHzKrGZZq@cluster0.k9spq.mongodb.net/svc-vc-mongodb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(4000, () => console.log('Server is running'));
    })
    .catch(err => console.log(err))
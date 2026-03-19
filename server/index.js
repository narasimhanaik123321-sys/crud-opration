const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Model
const Student = require('./models/Student');

// Routes
app.post('/create', (req, res) => {
  Student.create(req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.get('/students', (req, res) => {
  Student.find()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.put('/update/:id', (req, res) => {
  Student.findByIdAndUpdate(req.params.id, req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.delete('/delete/:id', (req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

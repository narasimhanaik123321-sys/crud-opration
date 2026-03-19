const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

const Student = require('./models/Student');

app.post('/create', async (req, res) => {
  try {
    const result = await Student.create(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get('/students', async (req, res) => {
  try {
    const result = await Student.find();
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put('/update/:id', async (req, res) => {
  try {
    const result = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    const result = await Student.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

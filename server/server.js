const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require('./routes/auth');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);


app.get('/items', (req, res) => {
  
    res.json({ message: 'Get all items' });
  })

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
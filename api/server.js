const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require('./routes/auth');
const entriesRoutes = require('./routes/entries');
const cors = require("cors")

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  'http://192.168.1.9:5500',
  'https://pineapp-the-budget-app.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Custom-Header');
  next();
});


app.use('/auth', authRoutes);
app.use('/entry', entriesRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
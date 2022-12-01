const express = require('express')
const { default: mongoose } = require('mongoose')
const errorHandler = require('./middleware.js/errorHandler')
const authRoutes = require('./routes/authRoutes')
const moviesRoutes = require('./routes/movieRoutes')
const dotenv = require("dotenv")
const app = express()

const cors = require("cors");
//-----------------------------------------------------------------------------
//cors

const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  credentials: true,
};


dotenv.config()

app.use(express.json())
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.MONGO_URL)
        .then(app.listen(4000,() => console.log('listening')))
        .catch(err => console.log(err))

app.use('/api/auth',authRoutes)
app.use('/api/movies',moviesRoutes)


app.use(errorHandler)

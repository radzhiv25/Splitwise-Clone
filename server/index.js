require("dotenv").config();
const express = require('express');
const cors = require('cors')
const connection = require('./db.js')
const authRoutes = require('./routes/auth.js')
const userRoutes = require('./routes/users.js')

const app = express()
connection()

// middleware
app.use(express.json())
app.use(cors())

//routes
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

const port = process.env.PORT || 4000
app.listen(port, (request, response) => {
    console.log(`running on port : ${port}...`);
})
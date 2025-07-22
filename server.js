const express = require('express')
const colors = require('colors')
const connectDB = require('./config/dbConfig')
const dotenv = require('dotenv').config()


connectDB()

const app = express()

app.listen(5000,() => {
    console.log(`Server is listning to port: 5000`.blue)
})
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const userRoutes = require('./routes/userRoutes')
const methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true}))
app.use(express.json)
app.use(express.static('static'))

module.exports = app
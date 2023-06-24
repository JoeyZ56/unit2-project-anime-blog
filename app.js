require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()
const userRoutes = require('./routes/userRoutes')
const methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true}))
app.use(express.json)
app.use(express.static('static'))
app.use(morgan('combined'))
app.use('/user', userRoutes)
app.use(methodOverride('_method'))

module.exports = app
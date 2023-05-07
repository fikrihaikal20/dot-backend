const express = require('express')
const app = express()
const db = require('./config/databaseConfig')
const bodyparser = require("body-parser")
const port = 8016

// Body Parser
app.use(express.json())
app.use(bodyparser.urlencoded({ extended : true}))

// Api routes
const authEndpoint = require('./api/routes/auth')
const userEndpoint = require('./api/routes/user')

app.use('/auth', authEndpoint)
app.use('/user', userEndpoint)
// app.use('/api', ApiRoutes);

// server
app.listen(port, () => console.log(`Listen to port ${port}`))

module.exports = app

const express = require('express')
const app = express()
const cors = require('cors')
const connect = require('./src/db/db-connection')

// Configure dotenv
require('dotenv').config()

// Add cors
app.use(cors())

// Body Parser
app.use(express.json())

// Conect db
connect.connect()

// set routers to listen
app.use('/auth', require('./src/routes/user'))

const PORT = process.env.PORT || 5000

// Server listenign
app.listen(PORT, () => console.log('Server runing on', PORT))

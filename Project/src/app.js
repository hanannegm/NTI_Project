const express= require('express')

const cors = require('cors')

require('./db/mongoose')

const userRoutes = require('./routes/user')

const adminRoutes = require('./routes/admin')

const writerRoutes = require('./routes/writer')

const bookRoutes = require('./routes/book')

const commentRoutes = require('./routes/feedback')

const app = express()

app.use(cors())

app.use(express.json())

app.use(userRoutes)

app.use(adminRoutes)

app.use(writerRoutes)

app.use(bookRoutes)

app.use(commentRoutes)

module.exports = app

module.exports = app
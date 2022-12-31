const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const app = express();


mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.once('open', () => {
    console.log('connected')
})

//Import Routes
const usersRoute = require('./routes/users')
const clientsRoute = require('./routes/clients')
const categoryRoute = require('./routes/category')
const productsRoute = require('./routes/products')
const transactionsRoute = require('./routes/transactions')
app.use(cors())
app.use(express.json())
app.use('/users', usersRoute)
app.use('/clients', clientsRoute)
app.use('/category', categoryRoute)
app.use('/products', productsRoute)
app.use('/transactions', transactionsRoute)

// Listen this ports
app.listen(3001)

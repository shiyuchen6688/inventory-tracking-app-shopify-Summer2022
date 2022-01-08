const express = require("express")
const app = express()
require('dotenv').config()
const notFoundMiddleware = require("./middlewares/not-found")
const errorMiddleware = require("./middlewares/error-handler")
const connectDB = require("./database/connect")
require("express-async-errors")
const itemsRoute = require("./routes/item")

// middlewares
app.use(express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// routes
app.use('/api/items', itemsRoute)

// handle incorrect url
app.use(notFoundMiddleware)
app.use(errorMiddleware)

// server listening on port
const port = process.env.PORT || 5000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO);
        app.listen(port, () => {
            console.log(`server listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()

module.exports = app
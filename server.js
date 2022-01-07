const express = require("express")
const app = express()
require('dotenv').config()
const notFoundMiddleware = require("./middleware/not-found")
const errorMiddleware = require("./middlewares/error-handler")
const connectDB = require("db/connect")
require("express-async-errors")
const itemsRoute = requier("./routes/item")

// middlewares
app.use(express.static('./public'))
app.use(express.json())

// routes
app.use('api/items', itemsRoute)

// handle incorrect url
app.use(notFoundMiddleware)
app.use(errorMiddleware)

// server listening on port
const port = procee.env.PORT || 5000;
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

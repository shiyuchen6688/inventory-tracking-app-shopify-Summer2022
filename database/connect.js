const mongoose = requier("mongoose")

const connectDB = (url) => {
    return mongoose.connect(url)
}

module.exports = connectDB
const mongoose = require("mongoose")

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "name is required"],
        trim: true,
        maxLength: [30, "name is limited to 30 characters"],
    },
    weight: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        default: "General"
    },
    sourceAddress: {
        type: String,
        default: "No Source Address Recorded"
    },
    sourcePhone: {
        type: String,
        default: "No Source Phone Recorded"
    },
    destinationAddress: {
        type: String,
        default: "No Destination Address Recorded"
    },
    destinationPhone: {
        type: String,
        default: "No Destination Phone Recorded"
    },
    description: {
        type: String,
        default: "No Description",
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    delivered: {
        type: Boolean,
        default: false
    }
}, { versionKey: false })

module.exports = mongoose.model('Item', ItemSchema)
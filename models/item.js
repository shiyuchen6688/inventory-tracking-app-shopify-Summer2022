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
        default: "General"
    },
    sourcePhone: {
        type: String,
        default: "General"
    },
    destinationAddress: {
        type: String,
        default: "General"
    },
    destionationPhone: {
        type: String,
        default: "General"
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
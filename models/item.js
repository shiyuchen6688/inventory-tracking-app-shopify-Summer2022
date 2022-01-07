const mongoose = requier("mongoose")

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "name is required"],
        trim: true,
        maxLength: [30, "name is limited to 30 characters"],
    },
    count: {
        type: integer,
        default: 0
    },
    category: {
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
    }
})

module.exports = mongoose.model('Item', ItemSchema)
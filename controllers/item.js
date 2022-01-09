const Item = require("../models/item")
const ItemNotFoundError = require("../error/ItemNotFoundError")
const ItemApiError = require("../error/ItemApiError")

const getAllItems = async (req, res) => {
    const items = await Item.find({})
    res.status(200).json({
        message: "All items successfully retrieved",
        items
    })
}
const getOneItem = async (req, res) => {
    const item = await Item.find({ _id: req.params.id })
    if (!item || item.length == 0) {
        throw new ItemNotFoundError();
    }
    res.status(200).json({
        message: "One item successfully retrieved",
        item
    })
}
const updateItem = async (req, res) => {
    console.log("updateItem")
    if (!validPhoneNumber(req.body.sourcePhone) || !validPhoneNumber(req.body.destinationPhone)) {
        throw new ItemApiError("invalid phone number", 400)
    }
    if (!isNumeric(req.body.weight) || isEmpty(req.body.weight)) {
        console.log(req.body.weight)
        throw new ItemApiError("invalid weight", 400)
    }
    if (isEmpty(req.body.name)) {
        throw new ItemApiError("invalid name", 400)
    }
    if (isEmpty(req.body.sourceAddress)) {
        throw new ItemApiError("invalid source address", 400)
    }
    if (isEmpty(req.body.destinationAddress)) {
        throw new ItemApiError("invalid destination address", 400)
    }
    const item = await Item.findOneAndUpdate({ _id: req.params.id }, req.body)
    if (!item || item.length == 0) {
        throw new ItemNotFoundError();
    }
    res.status(200).json({
        message: "One item successfully updated",
        item
    })
}
const deleteItem = async (req, res) => {
    const item = await Item.findOneAndDelete({ _id: req.params.id })
    if (!item || item.length == 0) {
        throw new ItemNotFoundError();
    }
    res.status(200).json({
        message: "One item successfully deleted",
        item
    })
}
const createItem = async (req, res) => {
    if (!validPhoneNumber(req.body.sourcePhone) || !validPhoneNumber(req.body.destinationPhone)) {
        throw new ItemApiError("invalid phone number", 400)
    }
    if (!isNumeric(req.body.weight) || isEmpty(req.body.weight)) {
        console.log(req.body.weight)
        throw new ItemApiError("invalid weight", 400)
    }
    if (isEmpty(req.body.name)) {
        throw new ItemApiError("invalid name", 400)
    }
    if (isEmpty(req.body.sourceAddress)) {
        throw new ItemApiError("invalid source address", 400)
    }
    if (isEmpty(req.body.destinationAddress)) {
        throw new ItemApiError("invalid destination address", 400)
    }
    const item = await Item.create(req.body)
    res.status(201).json({
        message: "One item successfully added",
        item
    })
}


function validPhoneNumber(phoneNumber) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    return re.test(phoneNumber);
}

function isNumeric(input) {
    if (typeof input != "string" && typeof input != "number") return false
    return !isNaN(input) && !isNaN(parseFloat(input)) // whitespace fail
}

function isEmpty(input) {
    input = String(input)
    return input == null || !input.trim().length;
}

module.exports = {
    getAllItems,
    getOneItem,
    updateItem,
    deleteItem,
    createItem
}
const Item = require("../models/item")
const ItemNotFoundError = require("../error/ItemNotFoundError")

const getAllItems = async (req, res) => {
    const items = await Item.find({})
    res.status(200).json({ items })
}
const getOneItem = async (req, res) => {
    const item = await Item.find({ _id: req.params.id })
    if (!item || item.length == 0) {
        throw new ItemNotFoundError();
    }
    res.status(200).json({ item })
}
const updateItem = async (req, res) => {
    console.log("updateItem")
    const item = await Item.findOneAndUpdate({ _id: req.params.id }, req.body)
    if (!item || item.length == 0) {
        throw new ItemNotFoundError();
    }
    res.status(200).json({ item })
}
const deleteItem = async (req, res) => {
    const item = await Item.findOneAndDelete({ _id: req.params.id })
    if (!item || item.length == 0) {
        throw new ItemNotFoundError();
    }
    res.status(200).json({ item })
}
const createItem = async (req, res) => {
    const item = await Item.create(req.body)
    res.status(201).json({
        item
    })
}

module.exports = {
    getAllItems,
    getOneItem,
    updateItem,
    deleteItem,
    createItem
}
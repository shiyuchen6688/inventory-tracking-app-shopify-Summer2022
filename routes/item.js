const express = require("express")
const router = experss.Router()
const {
    getAllItems,
    getOneItem,
    updateItem,
    deleteItem,
    createItem
} = require("../controllers/item")

router.route('/:id').get(getOneItem).patch(updateItem).delete(deleteItem)
router.route('/').get(getAllItems).post(createItem)

module.exports = router
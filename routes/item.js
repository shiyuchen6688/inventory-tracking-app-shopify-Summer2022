const express = require("express")
const router = express.Router()
const {
    getAllItems,
    getOneItem,
    updateItem,
    deleteItem,
    createItem
} = require("../controllers/item")

const {
    downloadExportCSV
} = require("../controllers/itemCSVExporter")


router.route('/download-csv').get(downloadExportCSV)
router.route('/:id').get(getOneItem).patch(updateItem).delete(deleteItem)
router.route('/').get(getAllItems).post(createItem)

module.exports = router
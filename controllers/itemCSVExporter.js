const fs = require("fs")
const ObjectsToCsv = require('objects-to-csv');
const Item = require("../models/item")

const downloadExportCSV = async (req, res) => {
    const items = await Item.find({}).lean();
    console.log(items)
    console.log("exporting to csv")
    const csv = new ObjectsToCsv(items)
    res.attachment('products.csv')
    res.status(200).send(await csv.toString(header = true, allColumns = true))
}



module.exports = {
    downloadExportCSV
}
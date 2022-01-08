const ItemError = require("./ItemError")

class ItemNotFoundError extends ItemError {
    constructor() {
        super("Item Does Not Exist", 404)
    }
}

module.exports = ItemNotFoundError
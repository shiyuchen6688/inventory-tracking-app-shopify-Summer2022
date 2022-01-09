const ItemApiError = require("./ItemApiError")

class ItemNotFoundError extends ItemApiError {
    constructor() {
        super("Item Does Not Exist", 404)
    }
}

module.exports = ItemNotFoundError
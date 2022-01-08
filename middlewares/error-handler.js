const ItemError = require("../error/ItemError")
const errorHandlerMiddleware = async (err, req, res, next) => {
    console.log(err)

    if (err instanceof ItemError) {
        return res.status(err.statusCode).json({
            message: err.message
        })
    }
    return res.status(500).json({
        message: "Sorry, There is a Server Error",
        error: err
    })
}

module.exports = errorHandlerMiddleware
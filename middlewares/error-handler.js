const errorHandlerMiddleware = async (err, req, res, next) => {
    console.log(error)
    return res.status(500).json({
        message: "sorry, there is a server error",
        error: error
    })
}

module.exports = errorHandlerMiddleware
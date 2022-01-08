const errorHandlerMiddleware = async (err, req, res, next) => {
    console.log(err)
    return res.status(500).json({
        message: "sorry, there is a server error",
        error: err
    })
}

module.exports = errorHandlerMiddleware
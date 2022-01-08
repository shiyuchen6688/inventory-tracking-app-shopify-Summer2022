const notFound = (req, res) => {
    res.status(404).send("Route cannot be found, please double check")
}

module.exports = notFound
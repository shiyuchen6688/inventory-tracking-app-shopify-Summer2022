class ItemApiError extends Error {
    constructor(errorMessage, statusCode) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = errorMessage ||
            'Something Went Wrong, Please Try Again Later';
        this.statusCode = statusCode || 500;

    }
}

module.exports = ItemApiError
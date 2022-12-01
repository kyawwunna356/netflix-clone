const errorHandler = (err,req,res,next) => {
    err.status = err.status ? err.status : 500
    res.status(err.status).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
    })
}

module.exports = errorHandler
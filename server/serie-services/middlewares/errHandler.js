function errHandler(err, req, res, next){
    console.log(err)
    res.status(500).json({ err, message: "internal server error"})
}

module.exports = errHandler
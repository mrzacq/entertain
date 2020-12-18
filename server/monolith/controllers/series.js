const Series = require('../models/series.js')

class Controller {
    static getSeriesList(req, res, next){
        Series.find()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static getById(req, res, next){
        Series.findById(+req.params.id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static create(req, res, next){
        const {title, overview, poster_path, popularity, tags} = req.body
        Series.create({title, overview, popularity, poster_path, tags})
        .then(data => {
            res.status(201).json(data.ops[0])
        })
        .catch(err => {
            next(err)
        })
    }
    
    static updateSeries(req, res, next){
        const {title, overview, poster_path, popularity, tags} = req.body
        Series.findByIdAndUpdate(+req.params.id, {title, overview, poster_path, popularity, tags})
            .then(data => {
                res.status(200).json(data.result)
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(req, res, next){
        Series.findByIdAndDelete(+req.params.id)
            .then(data => {
                res.status(200).json(data.result)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = Controller
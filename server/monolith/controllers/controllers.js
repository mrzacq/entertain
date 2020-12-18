const Movie = require('../models/models')

class Controller {
    static getMovieList(req, res, next){
        Movie.find()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static getById(req, res, next){
        Movie.findById(req.params.id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static create(req, res, next){
        const {title, overview, poster_path, popularity, tags} = req.body
        Movie.create({title, overview, popularity, poster_path, tags})
        .then(data => {
            res.status(201).json(data.ops[0])
        })
        .catch(err => {
            next(err)
        })
    }
    
    static updateMovie(req, res, next){
        const {title, overview, poster_path, popularity, tags} = req.body
        Movie.findByIdAndUpdate(req.params.id, {title, overview, poster_path, popularity, tags})
            .then(data => {
                res.status(200).json(data.result)
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(req, res, next){
        Movie.findByIdAndDelete(req.params.id)
            .then(data => {
                res.status(200).json(data.result)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = Controller
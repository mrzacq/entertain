const { ObjectId } = require('mongodb')
const db = require('../config/config')
const Movie = db.collection("movies")

class MovieController {
    static getMovieList(req, res, next){
        Movie.find({}).toArray()
            .then(allMovies => {
                res.status(200).json(allMovies)
            })
            .catch(err => {
                next(err)
            })
    }

    static getById(req, res, next){
        Movie.findOne({ _id: ObjectId(req.params.id) })
            .then(movie => {
                res.status(200).json(movie)
            })
            .catch(err => {
                next(err)
            })
    }

    static create(req, res, next){
        const {title, overview, poster_path, popularity, tags} = req.body
        Movie.insertOne({title, overview, popularity, poster_path, tags})
        .then(movie => {
            res.status(201).json(movie.ops[0])
        })
        .catch(err => {
            next(err)
        })
    }
    
    static updateMovie(req, res, next){
        const {title, overview, poster_path, popularity, tags} = req.body
        Movie.findOne({ _id: ObjectId(req.params.id)})
            .then((movie) => {
                return Movie.findOneAndUpdate({
                    _id: ObjectId(req.params.id)
                }, {
                    $set: {
                        title, overview, poster_path, popularity, tags
                    }
                }, {
                    returnOriginal: false
                })
            })
            .then((movie) => {
                res.status(200).json(movie.value)
            })
            .catch((err) => {
                next(err)
            })
    }

    static delete(req, res, next){
        let movie
        Movie.findOne({ _id: ObjectId(req.params.id)})
            .then(data => {
                movie = data
                return Movie.deleteOne({ _id: ObjectId(req.params.id)})
            })
            .then(() => {
                res.status(200).json(movie)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = MovieController
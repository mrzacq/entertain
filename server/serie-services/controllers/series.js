const { ObjectId } = require('mongodb')
const db = require('../config/config')
const Serie = db.collection("series")

class SerieController {
    static getSerieList(req, res, next){
        Serie.find({}).toArray()
            .then(allSeries => {
                res.status(200).json(allSeries)
            })
            .catch(err => {
                next(err)
            })
    }

    static getById(req, res, next){
        Serie.findOne({ _id: ObjectId(req.params.id) })
            .then(serie => {
                res.status(200).json(serie)
            })
            .catch(err => {
                next(err)
            })
    }

    static create(req, res, next){
        const {title, overview, poster_path, popularity, tags} = req.body
        Serie.insertOne({title, overview, popularity, poster_path, tags})
        .then(serie => {
            res.status(201).json(serie.ops[0])
        })
        .catch(err => {
            next(err)
        })
    }
    
    static updateSerie(req, res, next){
        const {title, overview, poster_path, popularity, tags} = req.body
        Serie.findOne({ _id: ObjectId(req.params.id)})
            .then((serie) => {
                return Serie.findOneAndUpdate({
                    _id: ObjectId(req.params.id)
                }, {
                    $set: {
                        title, overview, poster_path, popularity, tags
                    }
                }, {
                    returnOriginal: false
                })
            })
            .then((serie) => {
                res.status(200).json(serie.value)
            })
            .catch((err) => {
                next(err)
            })
    }

    static delete(req, res, next){
        let serie
        Serie.findOne({ _id: ObjectId(req.params.id)})
            .then(data => {
                serie = data
                return Serie.deleteOne({ _id: ObjectId(req.params.id)})
            })
            .then(() => {
                res.status(200).json(serie)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = SerieController
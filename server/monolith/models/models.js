const db = require('../config/config')
const Movie = db.collection("movies")
const { ObjectId } = require('mongodb')

class Model {
    static find(){
        return Movie.find().toArray()
    }

    static findById(id){
        return Movie.findOne({ _id: ObjectId(id)})
    }

    static create(movie){
        return Movie.insertOne(movie)
    }

    static findByIdAndUpdate(id, movie){
        return Movie.updateOne({ _id: ObjectId(id)}, {
            $set: movie
        })
    }

    static findByIdAndDelete(id){
        return Movie.deleteOne({ _id: ObjectId(id)})
    }
}

module.exports = Model
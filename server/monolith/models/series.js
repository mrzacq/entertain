const db = require('../config/config')
const Series = db.collection("series")
const { ObjectId } = require('mongodb')

class SeriesModel {
    static find(){
        return Series.find().toArray()
    }

    static findById(id){
        return Series.findOne({ _id: ObjectId(id)})
    }

    static create(series){
        return Series.insertOne(series)
    }

    static findByIdAndUpdate(id, series){
        return Series.updateOne({ _id: ObjectId(id)}, {
            $set: series
        })
    }

    static findByIdAndDelete(id){
        return Series.deleteOne({ _id: ObjectId(id)})
    }
}

module.exports = SeriesModel
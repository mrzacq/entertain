const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
const dbName = 'entertain_me'

const connect = async () => await client.connect()
connect()

const db = client.db(dbName)
module.exports = db
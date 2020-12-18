const { ApolloServer, gql } = require('apollo-server')
const Redis = require("ioredis");
const redis = new Redis();
const serieUrl = "http://localhost:5002/series";
const axios = require("axios");

const typeDefs = gql`
type Serie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
}
extend type Query {
    series: [Serie]
    serie(_id: ID): Serie
}
input SerieInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
}
extend type Mutation {
    addSerie(serie: SerieInput): Serie
    updateSerie(_id: ID, serie: SerieInput): Serie
    deleteSerie(_id: ID): Serie
}`;


const resolvers = {
    Query: {
        series: async () => {
            const cache = await redis.get("series")
            try {
                if (cache) {
                    return JSON.parse(cache)
                } else {
                    const { data } = await axios({
                        url: serieUrl,
                        method: 'get'
                    })
                    redis.set("series", JSON.stringify(data))
                    return data
                }
            } catch (error) {
                return error
            }
        },
        serie: async (_, args) => {
            const cache = await redis.get("series")
            try {
                if (cache) {
                    let serie = JSON.parse(cache).filter(el => el._id === args._id)
                    return serie[0]
                } else {
                    const { data } = await axios({
                        url: `${serieUrl}/${args._id}`,
                        method: "get",
                    })
                    return data
                }
            } catch (error) {
                return error
            }
        }
    },
    Mutation: {
        addSerie: async (_, args) => {
            const { data } = await axios({
                url: serieUrl,
                method: "post",
                data: args.serie
            })
            const currentSerie = await redis.get("series")
            const newSerie = JSON.parse(currentSerie).concat(data)
            await redis.set("series", JSON.stringify(newSerie))
            return data
        },
        updateSerie: async (_, args) => {
            const { data } = await axios({
                url: `${serieUrl}/${args._id}`,
                method: 'put',
                data: args.serie
            })
            const currentSerie = await redis.get("series")
            const filtered = JSON.parse(currentSerie).filter(el => el._id !== args._id)
            const updated = filtered.concat(data)
            await redis.set("series", JSON.stringify(updated))
            return data
        },
        deleteSerie: async (_, args) => {
            const { data } = await axios({
                url: `${serieUrl}/${args._id}`,
                method: 'delete'
            })
            const currentSerie = await redis.get("series")
            const updated = JSON.parse(currentSerie).filter(el => el._id !== args._id)
            await redis.set("series", JSON.stringify(updated))
            return data
        }
    }
}

module.exports = { typeDefs, resolvers }
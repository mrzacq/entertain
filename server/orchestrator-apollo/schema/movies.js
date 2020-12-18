const { ApolloServer, gql } = require('apollo-server')
const Redis = require("ioredis");
const redis = new Redis();
const movieUrl = "http://localhost:5001/movies";
const axios = require("axios");

const typeDefs = gql`
type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
}
extend type Query {
    movies: [Movie]
    movie(_id: ID): Movie
}
input MovieInput {
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
}
extend type Mutation {
    addMovie(movie: MovieInput): Movie
    updateMovie(_id: ID, movie: MovieInput): Movie
    deleteMovie(_id: ID): Movie
}`;

const resolvers = {
    Query: {
        movies: async () => {
            const cache = await redis.get("movies")
            try {
                if (cache) {
                    return JSON.parse(cache)
                } else {
                    const { data } = await axios({
                        url: movieUrl,
                        method: 'get'
                    })
                    redis.set("movies", JSON.stringify(data))
                    return data
                }
            } catch (error) {
                return error
            }
        },
        movie: async (_, args) => {
            const cache = await redis.get("movies")
            try {
                if (cache) {
                    let movie = JSON.parse(cache).filter(el => el._id === args._id)
                    return movie[0]
                } else {
                    const { data } = await axios({
                        url: `${movieUrl}/${args._id}`,
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
        addMovie: async (_, args) => {
            const { data } = await axios({
                url: movieUrl,
                method: "post",
                data: args.movie
            })
            const currentMovie = await redis.get("movies")
            const newMovie = JSON.parse(currentMovie).concat(data)
            await redis.set("movies", JSON.stringify(newMovie))
            return data
        },
        updateMovie: async (_, args) => {
            const { data } = await axios({
                url: `${movieUrl}/${args._id}`,
                method: 'put',
                data: args.movie
            })
            const currentMovie = await redis.get("movies")
            const filtered = JSON.parse(currentMovie).filter(el => el._id !== args._id)
            const updated = filtered.concat(data)
            await redis.set("movies", JSON.stringify(updated))
            return data
        },
        deleteMovie: async (_, args) => {
            const { data } = await axios({
                url: `${movieUrl}/${args._id}`,
                method: 'delete'
            })
            const currentMovie = await redis.get("movies")
            const updated = JSON.parse(currentMovie).filter(el => el._id !== args._id)
            await redis.set("movies", JSON.stringify(updated))
            return data
        }
    }
}

module.exports = { typeDefs, resolvers }
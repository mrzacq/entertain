const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server")
const movieSchema = require('./schema/movies')
const serisSchema = require('./schema/series')

const typeDefs = gql`
    type Query
    type Mutation
`

const schema = makeExecutableSchema({
    typeDefs: [typeDefs, movieSchema.typeDefs, serisSchema.typeDefs],
    resolvers: [movieSchema.resolvers, serisSchema.resolvers]
})

const server = new ApolloServer({ schema })

server.listen().then((({url}) => {
    console.log(`Server running ${url}`)
}))
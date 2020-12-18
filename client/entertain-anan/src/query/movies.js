import { gql } from '@apollo/client';

export const GET_FAVORITES = gql`
query getFavorites{
    favorites{
        _id,
        title,
        overview,
        poster_path,
        popularity,
        tags
    }
}
`
export const GET_MOVIES = gql`
query{
    movies{
        _id,
        title,
        overview,
        poster_path,
        popularity,
        tags
    }
}
`

export const GET_ONE_MOVIE = gql`
query($selectedId: ID){
    movie(_id: $selectedId){
        _id,
        title,
        overview,
        poster_path,
        popularity,
        tags
    }
}
`

export const ADD_MOVIE = gql`
mutation($newOne: MovieInput){
    addMovie(movie: $newOne){
        _id,
        title,
        overview,
        poster_path,
        popularity,
        tags
    }
}
`

export const UPDATE_MOVIE = gql`
mutation($selectedId: ID, $newData: MovieInput){
    updateMovie(_id: $selectedId, movie: $newData){
        _id,
        title,
        overview,
        poster_path,
        popularity,
        tags
    }
}
`

export const DELETE_MOVIE = gql`
mutation($id: ID){
    deleteMovie(_id: $id){
        _id,
        title,
        overview,
        poster_path,
        popularity,
        tags
    }
}
`
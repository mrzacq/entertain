import { gql } from '@apollo/client';

export const GET_SERIES = gql`
query{
    series{
        _id,
        title,
        overview,
        poster_path,
        popularity,
        tags
    }
}
`

export const GET_ONE_SERIE = gql`
query($selectedId: ID){
    serie(_id: $selectedId){
        _id,
        title,
        overview,
        poster_path,
        popularity,
        tags
    }
}
`

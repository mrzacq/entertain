import React from "react";
import { Card, Container, Button} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { DELETE_MOVIE, GET_MOVIES, GET_FAVORITES } from "../query/movies";
import { useMutation } from "@apollo/client";
import client from "../config/config";

export default function CardPage({ type, data }) {
  const history = useHistory();

  const toEdit = (id) => {
    history.push(`/edit-movie/${id}`);
  };
  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    refetchQueries: [
      {
        query: GET_MOVIES,
      },
    ],
  });
  const toDelete = (id, title) => {
    Swal.fire({
      icon: "success",
      title: `Success delete "${title.toUpperCase()}"`,
      timer: 3000,
      showConfirmButton: false,
    });
    deleteMovie({
      variables: { id: id },
    });
  };

  const toFavorit = (movie) => {
    const { favorites } = client.readQuery({
      query: GET_FAVORITES,
    });
    let dups = favorites.find((el) => el._id === movie._id);
    if (!dups) {
      Swal.fire({
        icon: "success",
        title: `"${movie.title.toUpperCase()}" has been added to favorit`,
        timer: 3000,
        showConfirmButton: false,
      });

      client.writeQuery({
        query: GET_FAVORITES,
        data: {
          favorites: [...favorites, movie],
        },
      });
      client.writeQuery({
        query: GET_FAVORITES,
        data: {
          favorites: [...favorites, movie],
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: `"${movie.title.toUpperCase()}" already exists to your favorit`,
        timer: 3000,
        showConfirmButton: false,
      });
      client.writeQuery({
        query: GET_FAVORITES,
        data: {
          favorites: [...favorites],
        },
      });
    }
  };
  const populer = (star) => {
    if (star > 80) {
      return <Card.Text>⭐⭐⭐⭐⭐</Card.Text>;
    } else if (star > 60) {
      return <Card.Text>⭐⭐⭐⭐</Card.Text>;
    } else if (star > 40) {
      return <Card.Text>⭐⭐⭐</Card.Text>;
    } else if (star > 20) {
      return <Card.Text>⭐⭐</Card.Text>;
    } else {
      return <Card.Text>⭐</Card.Text>;
    }
  };
  return (
    <>
      <Card style={{ width: "18rem" }} className="mx-auto my-2">
        <Card.Img
          style={{ width: 300, height: 400 }}
          variant="top"
          src={data.poster_path}
          alt={data.title}
        />
        <Card.Body>
          <Card.Title style={{ fontSize: 23, fontWeight: "bold" }}>
            {data.title.toUpperCase()}
          </Card.Title>
          <Card.Text>{populer(data.popularity)}</Card.Text>
          <Card.Text>{data.overview}</Card.Text>
        </Card.Body>
        {type !== "movie" ? (
          ""
        ) : (
          <Container style={{ marginBottom: 20 }}>
            <Button
              style={{ marginLeft: 48, marginRight: 10 }}
              variant="outline-success"
              onClick={() => toEdit(data._id)}
            >
              ✍️
            </Button>
            <Button
              style={{ marginLeft: 10, marginRight: 10 }}
              variant="outline-danger"
              onClick={() => toDelete(data._id, data.title)}
            >
              🗑️
            </Button>
            <Button
              style={{ marginLeft: 10, marginRight: 10 }}
              variant="outline-primary"
              onClick={() => toFavorit(data)}
            >
              👍
            </Button>
          </Container>
        )}
        <Card.Footer>
          {data.tags.map((tag) => {
            return <p>#{tag}</p>;
          })}
        </Card.Footer>
      </Card>
    </>
  );
}

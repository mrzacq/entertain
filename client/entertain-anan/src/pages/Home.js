import React from "react";
import { GET_ALL } from "../query/all";
import { useQuery } from "@apollo/client";
import CardPage from "../components/Card";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container,Card, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
function Home() {
  const { loading, error, data } = useQuery(GET_ALL);

  const history = useHistory();

  const toAdd = () => {
    history.push("/add-movie");
  };

  if (loading) {
    return (
      <div>
        <h1
          style={{
            textAlign: "center",
            fontSize: 40,
            fontWeight: "bold",
            marginTop: 50,
          }}
        >
          Loading...
        </h1>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h1
          style={{
            textAlign: "center",
            fontSize: 40,
            fontWeight: "bold",
            marginTop: 50,
          }}
        >
          Error...
        </h1>
      </div>
    );
  }
  return (
    <>
      <Header />
      <Container style={{ marginTop: 25, marginBottom: 15 }}>
        <Container>
          <Container>
            <Card.Title style={{ fontSize: 30 }}>
              List Movies
              <Button style={{marginLeft: 10}} onClick={() => toAdd()} variant="outline-success">
                ➕
              </Button>
            </Card.Title>
          </Container>
          <Card>
          <Row className="mt-3 mb-3">
            {data.movies.map((movie) => {
              return (
                <CardPage type={"movie"} data={movie} key={movie._id}></CardPage>
              )
            })}
          </Row>
          </Card>
        </Container>
        <Container style={{ marginTop: 25}}>
          <Container>
            <Card.Title style={{ fontSize: 30 }}>
              List Series
            </Card.Title>
          </Container>
          <Card>
          <Row className="mt-3 mb-3">
            {data.series.map((serie) => {
              return (
                <CardPage type={"serie"} data={serie} key={serie._id}></CardPage>
              )
            })}
          </Row>
          </Card>
        </Container>
      </Container>
      <Footer />
    </>
  );
}

export default Home;

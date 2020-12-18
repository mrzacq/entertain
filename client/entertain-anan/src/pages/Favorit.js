import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardPage from "../components/Card";
import { GET_FAVORITES } from "../query/movies";
import client from "../config/config";
import { Card, Container, Row, Image, Col } from "react-bootstrap";
function Favorit() {
  const [favorit, setFavorit] = useState([]);

  useEffect(() => {
    const { favorites } = client.readQuery({
      query: GET_FAVORITES,
    });
    setFavorit(favorites);
  }, []);

  return (
    <>
      <Header />
      {favorit.length === 0 ? (
        <Container style={{ marginTop: 25, marginBottom: 15 }}>
          <Container>
            <Container>
              <Card.Title style={{ fontSize: 30, textAlign: "center" }}>
                List Favorites
              </Card.Title>
            </Container>
            <Card>
              <Col>
                <Image
                  style={{ marginLeft: 200 }}
                  src="https://image.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg"
                  rounded
                />
              </Col>
            </Card>
          </Container>
        </Container>
      ) : (
        <Container style={{ marginTop: 25, marginBottom: 15 }}>
          <Container>
            <Container>
              <Card.Title style={{ fontSize: 30, textAlign: "center" }}>
                List Favorites
              </Card.Title>
            </Container>
            <Card>
              <Row className="mt-3 mb-3">
                {favorit.map((el) => {
                  return (
                    <CardPage
                      type={"favorite"}
                      data={el}
                      key={el._id}
                    ></CardPage>
                  );
                })}
              </Row>
            </Card>
          </Container>
        </Container>
      )}
      <Footer />
    </>
  );
}

export default Favorit;

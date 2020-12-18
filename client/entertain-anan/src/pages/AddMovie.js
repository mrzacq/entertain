import React, {useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { ADD_MOVIE, GET_MOVIES } from "../query/movies";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

function AddMovie() {
  const history = useHistory();
  const [title, setTitle] = useState("")
  const [overview, setOverview] = useState("")
  const [poster_path, setPosterPath] = useState("")
  const [popularity, setPopularity] = useState()
  const [tags, setTags] = useState([])
  const [errors, setErrors] = useState([])

  const [addMovie] = useMutation(ADD_MOVIE, {
    refetchQueries: [
      {
        query: GET_MOVIES,
      },
    ],
  });
  
  const handleTags = (e) => {
    let arr = []
    let value = e.target.value
    let rslt = value.split(",")
    let newTag = arr.concat(rslt)
    setTags(newTag)
  }

  const handlePopular = (value) => {
    setPopularity(+value)
  }
  const submit = (e) => {
    e.preventDefault()
    let arr = []
    if(title === ""){
      arr.push("Title is required!")
    }
    if(overview === ""){
      arr.push("Overview is required!")
    }
    if(poster_path === ""){
      arr.push("Poster is required!")
    }
    if(!popularity){
      arr.push("Popularity is required")
    }
    if(popularity > 100 || popularity < 0){
      arr.push("Input popularity between 0 - 100")
    }
    if(tags === ""){
      arr.push("Tag is required!")
    }
    if(arr.length > 0){
      let err = arr.join(", ")
      setErrors(err)
    } else {
      addMovie({
        variables: {newOne: {title, overview, poster_path, popularity, tags}}
      })
      history.push('/')
    }
  }
  return (
    <>
      <Header />
      <Container style={{ marginTop: 25, marginBottom: 50 }}>
        <Container
          style={{ textAlign: "center", fontSize: 25, fontWeight: "bold" }}
        >
          {errors.length > 0 ? <Alert variant="danger">{errors}</Alert> : []}
          <h1>Add Movie</h1>
        </Container>
        <Form onSubmit={(e) => submit(e)}>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="eg: 12 Angry Men" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicOverview">
            <Form.Label>Overview</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="eg: 12 Angry Men is about 12 judge that discuss about a kid that not guilty. One judge disagree, so the debate become hot."
              value={overview} onChange={(e) => setOverview(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPoster">
            <Form.Label>Poster</Form.Label>
            <Form.Control
              type="url"
              placeholder="eg: http://12-angry-men.png"
              value={poster_path} onChange={(e) => setPosterPath(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPopularity">
            <Form.Label>Popularity</Form.Label>
            <Form.Control type="number" placeholder="eg: 0 - 100" value={popularity} onChange={(e) => handlePopular(e.target.value)}/>
          </Form.Group>
          <Form.Group controlId="formBasicTags">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              placeholder="crime,mistery,documentary"
              value={tags} onChange={(e) => handleTags(e)}
            />
          </Form.Group>
          <Container style={{ textAlign: "center" }}>
            <Button variant="outline-primary" type="submit">➕</Button>
          </Container>
        </Form>
      </Container>
      <Footer />
    </>
  );
}

export default AddMovie;

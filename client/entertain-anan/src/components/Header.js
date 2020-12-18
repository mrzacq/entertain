import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
      <Navbar expand="lg" variant="warning" bg="warning">
        <Container style={{justifyContent: 'center'}}>
          <Navbar.Brand><Link to="/" style={{color: 'black'}}>EntertainMe</Link></Navbar.Brand>
          <Navbar.Brand><Link to="/favorit" style={{color: 'black'}}>Favorit</Link></Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;

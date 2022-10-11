import React from "react";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaShoppingCart } from "react-icons/fa";
import { LinkContainer } from 'react-router-bootstrap';

function NavBarApp() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container fluid className="mx-lg-5 p-1">
        <Navbar.Brand href="#" ><h3>Shop</h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" >
          <Nav
            className="me-auto my-2 my-lg-0 d-flex justify-content-end w-100 "
            navbarScroll
          >
            <LinkContainer to="/">
              <Nav.Link className="pb-2" >Home</Nav.Link>
            </LinkContainer>
            <Button variant="outline-primary" className="btn btn-outline-primary my-2 my-lg-0 mx-lg-3">Login</Button>
            <Button variant="outline-primary px-4"><FaShoppingCart /></Button>
            <Button variant="outline-primary" className="btn btn-outline-primary my-2 my-lg-0 mx-lg-3 d-none">Sing out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarApp;

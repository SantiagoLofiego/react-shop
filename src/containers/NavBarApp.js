import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import ShoppingCart from "../components/ShoppingCart";

function NavBarApp() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="">
      <Container fluid className=" p-1">
        <Navbar.Brand href="#" className="mx-lg-5">
          <h3>Shop</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 d-flex justify-content-end w-100 "
            navbarScroll
          >
            <LinkContainer to="/">
              <Nav.Link className="pb-2"> <h5 className=" m-0">Home</h5></Nav.Link>
            </LinkContainer>
            <Button
              variant="outline-primary"
              className="btn btn-outline-primary my-2 my-lg-0 mx-lg-3"
            >
              <h5 className=" m-0">Login</h5>
            </Button>
            <ShoppingCart />
            <Button
              variant="outline-primary"
              className="btn btn-outline-primary my-2 my-lg-0 me-lg-3 d-none "
            >
              Sing out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarApp;

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Alert from 'react-bootstrap/Alert';
import { LinkContainer } from "react-router-bootstrap";
import ShoppingCart from "./ShoppingCart";
import { AppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";
import { MdOutlineLogout, MdHome } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa"

function NavBarApp() {
  const { userState, logout } = React.useContext(AppContext)
  const [showAlertSession, setShowAlertSession] = useState(false);

  const handleLogout = () => {
    setShowAlertSession(true);
    logout();
  }

  return (
    <>
      <Navbar sticky="top" variant="dark" className="d-flex align-items-center bg-dark py-2 navbar-container">
        <LinkContainer className="text-decoration-none" to={'/'}>
          <LinkContainer to="/">
            <Navbar.Brand href="#" className="mx-lg-5 mx-1">
              <h1 className="m-0">Shop</h1>
            </Navbar.Brand>
          </LinkContainer>
        </LinkContainer>
        <div class="flex-grow-1"></div>
        <div className='d-flex justify-content-end align-items-center nav-icons'>
          <LinkContainer to="/">
            <Button variant="outline-primary" className="btn btn-outline-primary my-2 mx-lg-3 mx-1 nav-btn-home"><MdHome /></Button>
          </LinkContainer>
          {userState.user.authenticated
            ? <>
              <LinkContainer to="/account" >
                <NavLink >
                  <div className="nav-user-icon mx-2 my-1">
                    {userState.user.photoURL
                      ? <img src={userState.user.photoURL} alt="" />
                      : <FaUserAlt />}
                  </div>
                </NavLink>
              </LinkContainer>
              <span className="nav-email">{userState.user.email}</span>
              <Button variant="outline-primary" className="btn btn-outline-primary my-2 mx-lg-3 mx-1" onClick={handleLogout}><MdOutlineLogout /></Button>
            </>
            :
            <LinkContainer to="/Login">
              <Button variant="outline-primary" className="btn btn-outline-primary my-2 mx-lg-3 mx-1">Login</Button>
            </LinkContainer>
          }
        </div>
        <ShoppingCart />
      </Navbar>
      {showAlertSession ?
        <Alert key='primary' variant='primary' className="alert-session" onAnimationEnd={() => setShowAlertSession(false)}>
          Ha cerrado la sesión correctamente
        </Alert>
        : ''
      }
    </>
  );
}

export default NavBarApp;

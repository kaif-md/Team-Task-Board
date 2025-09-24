import React, { useContext } from "react";
import { Navbar as BootstrapNavbar, Container, Nav, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BootstrapNavbar.Brand href="/dashboard">Team Task Board</BootstrapNavbar.Brand>
        <Nav className="ms-auto">
          <Button variant="outline-light" onClick={logout}>
            Logout
          </Button>
        </Nav>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;

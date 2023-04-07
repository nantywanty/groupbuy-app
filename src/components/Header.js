// Packages
import { useState } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

// Components
import Login from "./Login.js";

export default function Header(props) {
  const [search_query, setSearch_query] = useState("");
  const navigate = useNavigate();

  // handler when user clicks on search button
  function handleSubmit(event) {
    event.preventDefault();
    const search = { search_query };
    navigate("/search", { state: search });
  }

  return (
    <div>
      <Navbar bg="light" expand={false} fixed="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img src="logo.png" width="200" alt="grouper-logo" />
          </Navbar.Brand>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search listings"
                value={search_query}
                onChange={(event) => setSearch_query(event.target.value)}
                required
              />
              <input type="submit" value="Search" />
            </form>
          </div>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-false`}
            aria-labelledby={`offcanvasNavbarLabel-expand-false`}
            scroll={true}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                <Login user={props.user} setUser={props.setUser} />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/mylistings">
                  Create New Listing
                </Nav.Link>
                <Nav.Link as={Link} to="/listings">
                  All Listings
                </Nav.Link>
                <Nav.Link as={Link} to="/myorders">
                  My Orders
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

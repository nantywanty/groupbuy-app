// Packages
import { Button, Container, Form, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Search } from 'react-bootstrap-icons';

// Components
import Login from "./Login.js";

export default function Header(props) {
    return (
        <div>
            <Navbar bg="light" expand={false} fixed="top">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">
                        <img src="logo.png" width="200" alt="grouper-logo"/>
                    </Navbar.Brand>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search listings"
                            className="me-2"
                            aria-label="Search"
                            htmlSize={50}
                        />
                        <Button variant="danger">
                            <Nav.Link as={Link} to="/search"><Search /></Nav.Link>
                        </Button>
                    </Form>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-false`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-false`}
                        scroll={true}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>

                                <Login user={props.user} setUser={props.setUser}/>

                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link as={Link} to="/mylistings">My Listings</Nav.Link>
                                <Nav.Link as={Link} to="/listings">All Listings</Nav.Link>
                                <Nav.Link as={Link} to="/myorders">My Orders</Nav.Link>
                                <Nav.Link as={Link} to="/order">Order</Nav.Link>
                            </Nav>
                            
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>
    );
}

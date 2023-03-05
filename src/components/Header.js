import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div>
            {[false].map((expand) => (
                <Navbar key={false} bg="light" expand={false} className="mb-3">
                    <Container fluid>
                        <Navbar.Brand as={Link} to="/">GroupBuy</Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Username
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <NavDropdown
                                        title="Account"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item as={Link} to="/login">
                                            Login
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} to="/login">
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link as={Link} to="/mylistings">My Listings</Nav.Link>
                                    <Nav.Link as={Link} to="/listing">Listing</Nav.Link>
                                    <Nav.Link as={Link} to="/myorders">My Orders</Nav.Link>
                                    <Nav.Link as={Link} to="/order">Order</Nav.Link>
                                </Nav>
                                <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                    <Button variant="outline-success">
                                        <Nav.Link as={Link} to="/search">Search Listings</Nav.Link>
                                    </Button>
                                </Form>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </div>
    );
}
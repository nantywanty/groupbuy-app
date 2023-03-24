import { useState } from 'react';
import { Card, FloatingLabel, Form, Row, Col, Button } from 'react-bootstrap';

export default function Order() {
    // Form data
    const [form, setForm] = useState({
        quantity: 1,
        address: '',
        postal_code: '',
        contact_details: '',
    });

    // When an input field is changed
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // When submit button is clicked
    const handleSubmit = (event) => {
        if (event.currentTarget.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            console.log(form);
        }
    };

    // Dummy data, actual data to be retrieved from database
    const listing = {
        owner: "Nant",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNFJtaMn_Y5zPbpVWA0ojPrD_WqKhvGgnfw&usqp=CAU",
        name: "Fuji Apples",
        description: "Fresh Fuji apples from Japan.",
        unit_price: 5.00,
        remaining_quantity: 5,
        end_date: "2023-03-15",
        delivery_date: "2023-02-15",
        status: "Open"
    }

    return (
        <div className="p-5" style={{
            backgroundImage: `url("https://png.pngtree.com/thumb_back/fw800/background/20200113/pngtree-chinese-new-year-2020-celebration-sale-template-for-background-and-wallpaper-image_327185.jpg")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '700px',
            backgroundColor: '#dc3545',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Card style = {{width: '45rem'}}>
                <Card.Header as="h5">New Order</Card.Header>
                <Card.Img className="px-3 pt-3"  src={listing.image_url}/>
                <Card.Body>
                    <Row className="mb-3">
                        <Col>
                            <Card.Title>{listing.name}</Card.Title>
                        </Col>
                        <Col xs="auto">
                            <Card.Title>Status: {listing.status}</Card.Title>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Card.Text>Sold by: {listing.owner}</Card.Text>
                        </Col>
                        <Col xs="auto">
                            <Card.Text>Closing date: {listing.end_date}</Card.Text>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Card.Text>Unit price: ${listing.unit_price.toFixed(2)}</Card.Text>
                        </Col>
                        <Col xs="auto">
                            <Card.Text>Delivery date: {listing.delivery_date}</Card.Text>
                        </Col>
                    </Row>
                    <Card.Text>Description: {listing.description}</Card.Text>

                    <Form noValidate validated={true} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col sm={8}>  
                                <FloatingLabel controlId="floatingQuantity" label="Quantity">
                                    <Form.Select 
                                        as={"input"} 
                                        name="quantity" 
                                        placeholder="dummy"
                                        value={form.quantity} 
                                        onChange={handleChange} 
                                        required
                                    >
                                        {Array(listing.remaining_quantity).fill(1).map((n, i) => (
                                            <option key={i}>{1+i}</option>
                                        ))}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col xs="auto" sm={4} style={{ display: 'flex', alignItems: 'center' }}>
                                Max available: {listing.remaining_quantity}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sm={8}>
                                <FloatingLabel  controlId="floatingAddress" label="Delivery Address">
                                    <Form.Control 
                                        type="text" 
                                        name="address" 
                                        placeholder="dummy" 
                                        value={form.address} 
                                        onChange={handleChange} 
                                        required
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col sm={4}>
                                <FloatingLabel controlId="floatingPostal" label="Postal Code">
                                    <Form.Control 
                                        type="tel" 
                                        pattern="[0-9]{6}"  
                                        name="postal_code" 
                                        placeholder="dummy" 
                                        value={form.postal_code} 
                                        onChange={handleChange} 
                                        required
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row >
                        <FloatingLabel className="mb-3" controlId="floatingContact" label="Contact Number">
                            <Form.Control 
                                type="tel" 
                                pattern="[0-9]{8}" 
                                name="contact_details" 
                                placeholder="dummy" 
                                value={form.contact_details} 
                                onChange={handleChange} 
                                required/>
                        </FloatingLabel>
                        <Row className="mb-1">
                            <Col style={{ display: 'flex', alignItems: 'center' }}>
                                <Card.Title>Total: ${(listing.unit_price*form.quantity).toFixed(2)}</Card.Title>
                            </Col>
                            <Col xs="auto">
                                <Button variant="danger" type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </Form>

                </Card.Body>
            </Card> 
        </div>
    );
}
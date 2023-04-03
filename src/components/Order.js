import { useState, useEffect } from 'react';
import { Card, FloatingLabel, Form, Row, Col, Button } from 'react-bootstrap';

export default function Order(props) {
    // Form data
    const [form, setForm] = useState({
        quantity: 1,
        address: props.order ? props.order.order_address : '',
        postal_code: props.order ? props.order.order_postal_code : '',
        contact_details: props.order ? props.order.order_contact_details : '',
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

    return (
        <div className="p-5" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Card style = {{width: '45rem'}}>
                {props.order ? (
                    <Card.Header as="h5">Edit Order</Card.Header>
                ):(
                    <Card.Header as="h5">New Order</Card.Header>
                )}
                <Card.Img className="px-3 pt-3"  src={props.listing.listing_image_url}/>
                <Card.Body>
                    <Row className="mb-3">
                        <Col>
                            <Card.Title>{props.listing.listing_name}</Card.Title>
                        </Col>
                        <Col xs="auto">
                            <Card.Title>Status: {props.listing.listing_status}</Card.Title>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Card.Text>Sold by: {props.listing.listing_owner}</Card.Text>
                        </Col>
                        <Col xs="auto">
                            <Card.Text>Closing date: {props.listing.listing_end_date}</Card.Text>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Card.Text>Unit price: ${props.listing.listing_unit_price.toFixed(2)}</Card.Text>
                        </Col>
                        <Col xs="auto">
                            <Card.Text>Delivery date: {props.listing.listing_delivery_date}</Card.Text>
                        </Col>
                    </Row>
                    <Card.Text>Description: {props.listing.listing_description}</Card.Text>

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
                                        {Array(props.listing.listing_remaining_quantity).fill(1).map((n, i) => (
                                            <option key={i}>{1+i}</option>
                                        ))}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col xs="auto" sm={4} style={{ display: 'flex', alignItems: 'center' }}>
                                Max available: {props.listing.listing_remaining_quantity}
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
                                <Card.Title>Total: ${(props.listing.listing_unit_price*form.quantity).toFixed(2)}</Card.Title>
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
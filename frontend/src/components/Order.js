import { useState } from 'react';
import { Card, FloatingLabel, Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function Order(props) {
    const navigate = useNavigate()

    // Form data
    const [form, setForm] = useState({
        order_owner: props.user.email, //actual
        // order_owner: "ywhdarius@gmail.com", //test
        listing_id: props.listing.listing_id,
        order_quantity: 1,
        order_contact_details: props.order ? props.order.order_contact_details : '',
        order_address: props.order ? props.order.order_address : '',
        order_postal_code: props.order ? props.order.order_postal_code : '',
    });

    // When an input field is changed
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.name === "order_quantity" ? Number(e.target.value) : e.target.value });
    }

    // When submit button is clicked
    const handleSubmit = (event) => {
        if (event.currentTarget.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            props.order ? (
                fetch('http://Gbbackendserver-env.eba-farf3wjj.us-east-1.elasticbeanstalk.com/edit_order/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        order_id: props.order.order_id,
                        order_address: form.order_address,
                        order_postal_code: form.order_postal_code,
                        order_contact_details: form.order_contact_details,
                        order_quantity: form.order_quantity
                    })
                })
                .then(response => response.json())
                .then(navigate("/myorders"))
            ):(
                fetch('http://Gbbackendserver-env.eba-farf3wjj.us-east-1.elasticbeanstalk.com/submit_order/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form)
                })
                .then(response => response.json())
                .then(navigate("/myorders"))
            );
        }
    };

    // When cancel button is clicked
    const handleCancel = () => {
        console.log("Order cancelled");
        navigate("/myorders")
    }

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
                <Card.Img className="px-3 pt-3"  src={props.listing.listing_cloudfront_url}/>
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
                                        name="order_quantity" 
                                        placeholder="dummy"
                                        value={form.order_quantity} 
                                        onChange={handleChange} 
                                        required
                                    >
                                        {[...Array(props.listing.listing_remaining_quantity).keys()].map((i) => (
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
                                        name="order_address" 
                                        placeholder="dummy" 
                                        value={form.order_address} 
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
                                        name="order_postal_code" 
                                        placeholder="dummy" 
                                        value={form.order_postal_code} 
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
                                name="order_contact_details" 
                                placeholder="dummy" 
                                value={form.order_contact_details} 
                                onChange={handleChange} 
                                required/>
                        </FloatingLabel>
                        <Row className="mb-1">
                            <Col style={{ display: 'flex', alignItems: 'center' }}>
                                <Card.Title>Total: ${(props.listing.listing_unit_price*form.order_quantity).toFixed(2)}</Card.Title>
                            </Col>
                            
                            <Col xs="auto">
                                {props.order ? (<Button variant="secondary" onClick={handleCancel}>Cancel Order</Button>):(<div />)}
                            </Col>
                            <Col xs="auto">
                                {props.order ? (
                                    <Button variant="danger" type="submit">Save Changes</Button>
                                ):(
                                    <Button variant="danger" type="submit">Place Order</Button>
                                )}
                            </Col>
                        </Row>
                    </Form>

                </Card.Body>
            </Card> 
        </div>
    );
}
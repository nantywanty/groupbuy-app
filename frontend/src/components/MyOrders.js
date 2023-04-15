import { Card, CardGroup, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function MyOrders(props) {
    // internal state variables used within component only
    const navigate = useNavigate()
    const [orders, setOrders] = useState(null);
    const [listings, setListings] = useState(null);

    // load user's orders and the associated listings
    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order_owner: props.user ? props.user.email : null }) // actual
            // body: JSON.stringify({ order_owner: "ywhdarius@gmail.com" }) // test
        };
        fetch('http://Gbbackendserver-env.eba-farf3wjj.us-east-1.elasticbeanstalk.com/get_orders_for_user/', requestOptions)
            .then(response => response.json())
            .then(data => {
                setOrders(Object.values(data.data.user_orders_info));
                setListings(Object.values(data.data.associated_listings_info));
            })
    });

    return (
        <div className="p-3"> 
            <h2 className="p-2">My Orders</h2>
            <CardGroup>
                {orders ? (
                    //orders is not empty
                    orders.map((order, idx) => {
                        // find the listing associated to each order
                        const listing = listings.find(obj => obj.listing_id === order.order_listing_id);

                        return (
                            <div className="m-2" key={idx}>   
                                <Card style = {{width: '20rem'}}>
                                    <Card.Img className="px-3 pt-3"  src={listing.listing_cloudfront_url}/>
                                    <Card.Body>
                                        <Card.Title>{listing.listing_name }</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Sold by: {listing.listing_owner}</Card.Subtitle>
                                        <Card.Text>Listing status: {listing.listing_status}</Card.Text>
                                        <Card.Text>Closing date: {listing.listing_end_date}</Card.Text>
                                        <Card.Text>Ordered quantity: {order.order_quantity}</Card.Text>
                                        <Card.Text>Total: ${order.order_total_amount.toFixed(2)}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Row>
                                            <Col style={{ display: 'flex', alignItems: 'center' }}>
                                                Order {order.order_status}
                                            </Col>
                                            <Col xs="auto">
                                                {order.order_status === "placed" ? (
                                                    <Button variant="danger" onClick={() => {
                                                        props.setOrder(order);
                                                        props.setListing(listing);
                                                        navigate("/order");
                                                    }}>
                                                        Edit/Cancel
                                                    </Button>
                                                ):(
                                                    <Button variant="secondary" disabled>Edit/Cancel</Button>
                                                )}
                                                    
                                            </Col>
                                        </Row>
                                    </Card.Footer>
                                </Card>
                            </div>
                        )
                    })
                ) : (
                    //orders is empty
                    <div />
                )}   
            </CardGroup>
        </div>
    );
}
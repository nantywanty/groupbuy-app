import { Card, CardGroup, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function MyOrders() {
    
    // // dummy data
    // const listing_item1 = {
    //     owner: "Nant",
    //     image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNFJtaMn_Y5zPbpVWA0ojPrD_WqKhvGgnfw&usqp=CAU",
    //     name: "Fuji Apples",
    //     description: "Fresh Fuji apples from Japan.",
    //     unit_price: 5.00,
    //     remaining_quantity: 5,
    //     end_date: "2023-03-15",
    //     delivery_date: "2023-05-15",
    //     status: "Open"
    // } 

    // const listing_item2 = {
    //     owner: "Nant",
    //     image_url: "https://cdn-prod.medicalnewstoday.com/content/images/articles/272/272782/oranges-in-a-box.jpg",
    //     name: "Oranges",
    //     description: "Fresh oranges",
    //     unit_price: 7.00,
    //     remaining_quantity: 3,
    //     end_date: "2023-04-15",
    //     delivery_date: "2023-05-15",
    //     status: "Closed"
    // } 

    // const orders = [
    //     {
    //         listing: listing_item1,
    //         status: 'Order placed',
    //         quantity: 1,
    //         address: '83 Redhill Lane',
    //         postal_code: '150083',
    //         contact_details: '86992755',
    //     },
    //     {
    //         listing: listing_item2,
    //         status: 'Order placed',
    //         quantity: 2,
    //         address: '280 Bukit Batok East',
    //         postal_code: '650280',
    //         contact_details: '81254166',
    //     },
    // ]
    // // end of dummy data
    
    const [orders, setOrders] = useState(null);
    
    useEffect(() => {
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order_owner: 'ywhdarius@gmail.com' })
        };
        fetch('http://Gbbackendserverebs-env.eba-x3jnjej6.us-east-1.elasticbeanstalk.com/get_orders_for_user/', requestOptions)
            .then(response => response.json())
            .then(data => setOrders(Object.values(data.data.user_orders_info)))
            // .then(console.log(orders));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);


    return (
        <div className="p-3"> 
            <h2 className="text-light p-2">My Orders</h2>
            <CardGroup>
                {orders ? (
                    //orders is not empty
                    orders.map((order, idx) => (
                        <div className="m-2" key={idx}>   
                            <Card style = {{width: '20rem'}}>

                                {/* <Card.Img className="px-3 pt-3"  src={order.listing.image_url}/> */}
                                
                                <Card.Body>
                                    <Card.Title>Listing ID: {order.order_listing_id}</Card.Title>

                                    {/* <Card.Subtitle className="mb-2 text-muted">Sold by: {order.listing.owner}</Card.Subtitle>
                                    <Card.Text>Listing status: {order.listing.status}</Card.Text>
                                    <Card.Text>Closing date: {order.listing.end_date}</Card.Text> */}

                                    <Card.Text>Ordered quantity: {order.order_quantity}</Card.Text>
                                    <Card.Text>Total: ${order.order_total_amount.toFixed(2)}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Row>
                                        <Col style={{ display: 'flex', alignItems: 'center' }}>
                                            Order {order.order_status}
                                        </Col>
                                        <Col xs="auto">
                                            <Button variant="danger">Edit/Cancel</Button>
                                        </Col>
                                    </Row>
                                </Card.Footer>
                            </Card>
                        </div>
                    ))
                ) : (
                    //orders is empty
                    <div />
                )}   
            </CardGroup>
        </div>
    );
}
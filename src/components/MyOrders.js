import { Card, CardGroup, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function MyOrders(props) {
    
    const [orders, setOrders] = useState(null);
    const [listings, setListings] = useState(null);

    // load user's orders and the associated listings
    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order_owner: props.user ? props.user.email : null }) // pull user's orders
            // body: JSON.stringify({ order_owner: "ywhdarius@gmail.com" }) // pull test orders
        };
        fetch('http://Gbbackendserverebs-env.eba-x3jnjej6.us-east-1.elasticbeanstalk.com/get_orders_for_user/', requestOptions)
            .then(response => response.json())
            .then(data => {
                setOrders(Object.values(data.data.user_orders_info));
                setListings(Object.values(data.data.associated_listings_info));
            })
    }, []);

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
                                    <Card.Img className="px-3 pt-3"  src={listing.listing_image_url}/>
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
                                                    <Button variant="danger">Edit/Cancel</Button>
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


// response for get_orders_for_user

// {
//     "data": {
//         "api_success": "success",
//         "api_execution": "success",
//         "api_info": "user orders data retrieved successfully",
//         "user_orders_info": [
//             {
//                 "order_id": 1,
//                 "order_owner": "ywhdarius@gmail.com",
//                 "order_listing_id": 1,
//                 "order_quantity": 60,
//                 "order_unit_price": 17.99,
//                 "order_total_amount": 1079.3999999999999,
//                 "order_contact_details": "17747812",
//                 "order_address": "Singapore bobo",
//                 "order_postal_code": "931123",
//                 "order_status": "placed",
//                 "order_created_at": "2023-03-21T10:10:21.607263Z",
//                 "order_updated_at": "2023-03-21T10:10:21.607285Z"
//             },
//             {
//                 "order_id": 2,
//                 "order_owner": "ywhdarius@gmail.com",
//                 "order_listing_id": 6,
//                 "order_quantity": 60,
//                 "order_unit_price": 12.5,
//                 "order_total_amount": 750.0,
//                 "order_contact_details": "91234567",
//                 "order_address": "nowhere",
//                 "order_postal_code": "648294",
//                 "order_status": "closed",
//                 "order_created_at": "2023-04-01T09:13:01.338115Z",
//                 "order_updated_at": "2023-04-01T09:13:01.338145Z"
//             }
//         ],
//         "associated_listings_info": [
//             {
//                 "listing_id": 1,
//                 "listing_owner": "ywhdarius@gmail.com",
//                 "listing_name": "test listing",
//                 "listing_image_url": "https://gb-storage-bucket.s3.amazonaws.com/915b159a-1e6c-47fd-9110-abf2114130dc.jpg",
//                 "listing_description": "3rd test listing description",
//                 "listing_unit_price": 17.99,
//                 "listing_max_quantity": 93,
//                 "listing_remaining_quantity": 33,
//                 "listing_end_date": "2023-03-21",
//                 "listing_delivery_date": "2023-03-31",
//                 "listing_status": "close",
//                 "listing_created_at": "2023-03-21T10:08:00.809077Z",
//                 "listing_updated_at": "2023-03-21T10:10:21.609272Z"
//             },
//             {
//                 "listing_id": 6,
//                 "listing_owner": "ywhdarius@gmail.com",
//                 "listing_name": "to be closed",
//                 "listing_image_url": "https://gb-storage-bucket.s3.amazonaws.com/c2ab5d19-8284-4d29-96ca-5365604c7545.jpg",
//                 "listing_description": "postman closing listing",
//                 "listing_unit_price": 12.5,
//                 "listing_max_quantity": 400,
//                 "listing_remaining_quantity": 340,
//                 "listing_end_date": "2023-03-31",
//                 "listing_delivery_date": "2023-05-05",
//                 "listing_status": "close",
//                 "listing_created_at": "2023-04-01T05:52:58.444227Z",
//                 "listing_updated_at": "2023-04-01T09:13:01.345110Z"
//             }
//         ]
//     }
// }
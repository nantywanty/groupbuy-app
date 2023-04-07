import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Card, CardGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Listings(props) {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function getListingsFromAPI() {
      const responsePromise = await fetch(
        "http://gbbackendserverebs-env.eba-x3jnjej6.us-east-1.elasticbeanstalk.com/get_listings"
      );
      const responseJSON = await responsePromise.json();
      const listings = responseJSON.data.listings_info;
      setListings([...listings]);
    }
    getListingsFromAPI();
  }, []);

  return (
    <div className="p-3">
      <h2 className="p-2">All Listings</h2>
      <CardGroup>
        {listings.map((listing) => {
          return (
            <div className="m-2" key={listing.listing_id}>
              <Card bg="light" style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={listing.listing_image_url}
                  height="250"
                  width="auto"
                />
                <Card.Body className="d-flex flex-column justify-content-end align-items-center">
                  <Card.Title>{listing.listing_name}</Card.Title>
                  <Card.Text>{listing.listing_description}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    Unit Price: $ {listing.listing_unit_price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Remaining Quantity: {listing.listing_remaining_quantity}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Closing date (2359 hrs): {listing.listing_end_date}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Delivery date: {listing.listing_delivery_date}
                  </ListGroup.Item>
                </ListGroup>
                <Card.Footer>
                    {props.user ? (
                        <Button
                            variant="danger"
                            onClick={() => {
                                props.setOrder(null);
                                props.setListing(listing);
                                navigate("/order");
                            }}
                        >
                            Place Order
                        </Button>
                    ):(
                        <Button variant="secondary" disabled>Place Order</Button>
                    )}  
                </Card.Footer>
              </Card>
            </div>
          );
        })}
      </CardGroup>
    </div>
  );
}

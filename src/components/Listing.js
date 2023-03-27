import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import ListGroup from "react-bootstrap/ListGroup";

export default function MyListings() {
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
    <>
      <h2>All Listings</h2>
      <CardGroup>
        {listings.map((listing) => {
          return (
            <div key={listing.listing_id}>
              <Card bg="light" border="dark" style={{ width: "18rem" }}>
                <Card.Img variant="top" src={listing.listing_image_url} />
                <Card.Body>
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
                <Card.Body>
                  <Card.Link href="#">Place Order</Card.Link>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </CardGroup>
    </>
  );
}

import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import ListGroup from "react-bootstrap/ListGroup";
import { useLocation } from "react-router-dom";

export default function Search() {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function getListingsFromAPI() {
      const responsePromise = await fetch(
        "http://gbbackendserverebs-env.eba-x3jnjej6.us-east-1.elasticbeanstalk.com/get_listings"
      );
      //      ,{
      //        method: "POST",
      //        headers: { "Content-Type": "application/json", "Accept": "application/json" },
      //        body: JSON.stringify(location.state),
      //      }
      // ); // pending back end endpoint
      const responseJSON = await responsePromise.json();
      const searchResults = responseJSON.data.listings_info;
      setSearchResults([...searchResults]);
    }
    getListingsFromAPI();
  }, []);

  return (
    <>
      <h2>Search Results</h2>
      <CardGroup>
        {searchResults.map((searchResult) => {
          return (
            <div key={searchResult.listing_id}>
              <Card bg="light" border="dark" style={{ width: "18rem" }}>
                <Card.Img variant="top" src={searchResult.listing_image_url} />
                <Card.Body>
                  <Card.Title>{searchResult.listing_name}</Card.Title>
                  <Card.Text>{searchResult.listing_description}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    Unit Price: $ {searchResult.listing_unit_price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Remaining Quantity:{" "}
                    {searchResult.listing_remaining_quantity}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Closing date (2359 hrs): {searchResult.listing_end_date}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Delivery date: {searchResult.listing_delivery_date}
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

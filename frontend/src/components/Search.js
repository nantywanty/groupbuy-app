import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Card, CardGroup, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

export default function Search(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);

  async function getListingsFromAPI() {
    const responsePromise = await fetch(
      "http://Gbbackendserver-env.eba-farf3wjj.us-east-1.elasticbeanstalk.com/search_listings/",
      {
        method: "POST",
        body: JSON.stringify(location.state),
      }
    );
    const responseJSON = await responsePromise.json();
    const searchResults = responseJSON.data.search_info;
    setSearchResults([...searchResults]);
  }
  getListingsFromAPI();

  return (
    <>
      <h2>Search Results</h2>
      <CardGroup>
        {searchResults.map((searchResult) => {
          return (
            <div key={searchResult.listing_id}>
              <Card bg="light" border="dark" style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={searchResult.listing_cloudfront_url}
                  height="250"
                  width="auto"
                />
                <Card.Body className="d-flex flex-column justify-content-end align-items-center">
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
                <Card.Footer>
                  <Button
                    variant="danger"
                    onClick={() => {
                      props.setOrder(null);
                      props.setListing(searchResult);
                      navigate("/order");
                    }}
                  >
                    Place Order
                  </Button>
                </Card.Footer>
              </Card>
            </div>
          );
        })}
      </CardGroup>
    </>
  );
}

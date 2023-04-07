import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyListings(props) {
  const [image, setImage] = useState(null);
  const [listing_owner, setListing_owner] = useState("");
  const [listing_name, setListing_name] = useState("");
  const [listing_description, setListing_description] = useState("");
  const [listing_unit_price, setListing_unit_price] = useState("");
  const [listing_max_quantity, setListing_max_quantity] = useState("");
  const [listing_remaining_quantity, setListing_remaining_quantity] =
    useState("");
  const [listing_end_date, setListing_end_date] = useState("");
  const [listing_delivery_date, setListing_delivery_date] = useState("");
  const navigate = useNavigate();

  const AddProductInfo = async () => {
    let formField = new FormData();
    if (image !== null) {
      formField.append("image", image);
    }
    formField.append("listing_owner", listing_owner);
    formField.append("listing_name", listing_name);
    formField.append("listing_description", listing_description);
    formField.append("listing_unit_price", listing_unit_price);
    formField.append("listing_max_quantity", listing_max_quantity);
    formField.append("listing_remaining_quantity", listing_remaining_quantity);
    formField.append("listing_end_date", listing_end_date);
    formField.append("listing_delivery_date", listing_delivery_date);

    await axios({
      method: "post",
      url: "http://Gbbackendserverebs-env.eba-x3jnjej6.us-east-1.elasticbeanstalk.com/create_listing/",
      data: formField,
    }).then((response) => {
      console.log(response.data);
      navigate("/listings");
    });
  };

  return (
    <div>
      <div className="container">
        <h1>Create a Product Listing</h1>
        <div className="form-group">
          <div className="form-group">
            <label>Upload an image of your product:</label>
            <input
              type="file"
              className="form-control form-control-lg"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <br></br>
          </div>
          <div className="form-group">
            <label>Your Grouper Email:</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter Your Email"
              name="listing_owner"
              value={props.user ? props.user.email : listing_name}
              onChange={(e) => setListing_owner(e.target.value)}
              disabled={props.user ? "disabled" : ""}
            />
            <br></br>
          </div>
          <div className="form-group">
            <label>Name of Product Listing:</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Give a name for your listing"
              name="listing_name"
              value={listing_name}
              onChange={(e) => setListing_name(e.target.value)}
            />
            <br></br>
          </div>
          <div className="form-group">
            <label>Short Description of Product Listing:</label>
            <textarea
              type="text"
              className="form-control form-control-lg"
              placeholder="Short description of your listing"
              name="listing_description"
              value={listing_description}
              onChange={(e) => setListing_description(e.target.value)}
            ></textarea>
            <br></br>
          </div>
          <label>Unit Price:</label>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              min="0"
              step="0.01"
              name="listing_unit_price"
              value={listing_unit_price}
              onChange={(e) => setListing_unit_price(e.target.value)}
            />
            <br></br>
          </div>
          <label>Quantity available:</label>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              min="0"
              step="1"
              name="listing_max_quantity"
              value={listing_max_quantity}
              onChange={(e) => {
                setListing_max_quantity(e.target.value);
                setListing_remaining_quantity(e.target.value);
              }}
            />
            <br></br>
          </div>
          <div className="form-group">
            <label>Closing date of listing (2359 hrs):</label>
            <input
              type="date"
              className="form-control form-control-lg"
              name="listing_end_date"
              value={listing_end_date}
              onChange={(e) => setListing_end_date(e.target.value)}
            />
            <br></br>
          </div>
          <label>Product Delivery Date:</label>
          <div className="form-group">
            <input
              type="date"
              className="form-control form-control-lg"
              name="listing_delivery_date"
              value={listing_delivery_date}
              onChange={(e) => setListing_delivery_date(e.target.value)}
            />
            <br></br>
          </div>
          <button className="btn-btn-success" onClick={AddProductInfo}>
            Add Listing
          </button>
        </div>
      </div>
    </div>
  );
}

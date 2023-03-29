class Listing {
  listing_owner = "";
  listing_name = "";
  listing_description = "";
  listing_unit_price = 0;
  listing_max_quantity = 0;
  listing_remaining_quantity = 0;
  listing_end_date = null;
  listing_delivery_date = null;

  constructor() {}

  setListing_owner(listing_owner) {
    this.listing_owner = listing_owner;
  }

  setListing_name(listing_name) {
    this.listing_name = listing_name;
  }

  setListing_description(listing_description) {
    this.listing_description = listing_description;
  }

  setListing_unit_price(listing_unit_price) {
    this.listing_unit_price = listing_unit_price;
  }

  setListing_max_quantity(listing_max_quantity) {
    this.listing_max_quantity = listing_max_quantity;
  }

  setListing_remaining_quantity(listing_remaining_quantity) {
    this.listing_remaining_quantity = listing_remaining_quantity;
  }

  setListing_end_date(listing_end_date) {
    this.listing_end_date = listing_end_date;
  }

  setListing_delivery_date(listing_delivery_date) {
    this.listing_delivery_date = listing_delivery_date;
  }
}

export default Listing;

// import packages
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Import components
import Home from "./components/Home.js";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import Search from "./components/Search.js";
import MyListings from "./components/MyListings.js";
import Listings from "./components/Listings.js";
import MyOrders from "./components/MyOrders.js";
import Order from "./components/Order.js";
import Login from "./components/Login.js";

export default function App() {
  const [user, setUser] = useState(null); // logged-in user
  const [order, setOrder] = useState(null); // specific order to be displayed in order page
  const [listing, setListing] = useState(null); // specific order to be displayed in listing/order page

  return (
    <BrowserRouter>
      <div
        className="App"
        style={{
          backgroundImage: `url("https://c.stocksy.com/a/wCFA00/z9/2441742.jpg")`,
          backgroundRepeat: "repeat",
          backgroundSize: "700px",
        }}
      >
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/search"
            element={<Search setOrder={setOrder} setListing={setListing} />}
          />
          <Route path="/mylistings" element={<MyListings user={user} />} />
          <Route
            path="/listings"
            element={<Listings user={user} setOrder={setOrder} setListing={setListing} />}
          />
          <Route
            path="/myorders"
            key={Date.now()}
            element={
              <MyOrders user={user} setOrder={setOrder} setListing={setListing} />}
          />
          <Route
            path="/order"
            element={<Order user={user} order={order} listing={listing} />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

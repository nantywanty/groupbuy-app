// import packages
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Import components
import Home from "./components/Home.js";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import Search from "./components/Search.js";
import MyListings from "./components/MyListings.js";
import Listing from "./components/Listing.js";
import MyOrders from "./components/MyOrders.js";
import Order from "./components/Order.js";
import Login from "./components/Login.js";

export default function App() {
    return (
    <BrowserRouter>
        <div>
        <Header />
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/search">Search Listings</Link></li>
                <li><Link to="/mylistings">My Listings</Link></li>
                <li><Link to="/listing">Listing</Link></li>
                <li><Link to="/myorders">My Orders</Link></li>
                <li><Link to="/order">Order</Link></li>
                <li><Login /></li>
            </ul>
        </nav>

        <Routes>
            <Route path="/" element = {<Home />} />
            <Route path="/search" element = {<Search />} />
            <Route path="/mylistings" element = {<MyListings />} />
            <Route path="/listing" element = {<Listing />} />
            <Route path="/myorders" element = {<MyOrders />} />
            <Route path="/order" element = {<Order />} />
        </Routes>

        <Footer />
        </div>
    </BrowserRouter>
    );
}

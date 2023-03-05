// import packages
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
            
            <Routes>
                <Route path="/" element = {<Home />} />
                <Route path="/search" element = {<Search />} />
                <Route path="/mylistings" element = {<MyListings />} />
                <Route path="/listing" element = {<Listing />} />
                <Route path="/myorders" element = {<MyOrders />} />
                <Route path="/order" element = {<Order />} />
                <Route path="/login" element = {<Login />} />
            </Routes>

            <Footer />
        </div>
    </BrowserRouter>
    );
}

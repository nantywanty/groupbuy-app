// import packages
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

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
    const [user, setUser] = useState(null); // logged-in use

    return (
    <BrowserRouter>
        <div className="App" style={{
            backgroundImage: `url("https://png.pngtree.com/thumb_back/fw800/background/20200113/pngtree-chinese-new-year-2020-celebration-sale-template-for-background-and-wallpaper-image_327185.jpg")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '700px',
        }}>
            <Header user={user} setUser = {setUser}/>
            <Routes>
                <Route path="/" element = {<Home />} />
                <Route path="/search" element = {<Search />} />
                <Route path="/mylistings" element = {<MyListings />} />
                <Route path="/listings" element = {<Listings />} />
                <Route path="/myorders" element = {<MyOrders />} />
                <Route path="/order" element = {<Order />} />
                <Route path="/login" element = {<Login />} />
            </Routes>
            <Footer />
        </div>
    </BrowserRouter>
    );
}

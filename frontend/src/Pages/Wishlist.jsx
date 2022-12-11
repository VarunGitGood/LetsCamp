import React, { useState } from "react";
import NavBar from "../components/UI/NavBar";
import WishlistMap from "../components/UI/WishlistMap";
import { FetchData } from "../utils/REST";
import { useEffect } from "react";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  const getWishlist = async () => {
    try {
      const results = await FetchData(
        "/bootcamps/liked",
        true,
        window.localStorage.getItem("token")
      );
      setWishlist(results.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <>
      <NavBar />
      <WishlistMap data={wishlist}/>
    </>
  );
}

export default Wishlist;

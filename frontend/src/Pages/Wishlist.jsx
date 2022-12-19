import React, { useState } from "react";
import NavBar from "../components/UI/NavBar";
import WishlistMap from "../components/UI/WishlistMap";
import { FetchData } from "../utils/REST";
import { useEffect } from "react";
import Loading from "../components/UI/Loading";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const getWishlist = async () => {
    try {
      const results = await FetchData(
        "/bootcamps/liked",
        true,
        window.localStorage.getItem("token")
      );
      setLoading(false);
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
      {loading && <Loading flag={loading}/>}
      <WishlistMap data={wishlist}/>
    </>
  );
}

export default Wishlist;

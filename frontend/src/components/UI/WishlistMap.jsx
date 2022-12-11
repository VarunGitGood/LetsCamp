import React from "react";
import s from "../../styles/Wishlist.module.css";
import WishlistHolder from "./WishlistHolder";

function WishlistMap({ data }) {
  return (
    <div className={s.wishlist}>
      <div>
        <h1>My Wishlist</h1>
      </div>
      {data.map((i) => {
        return <WishlistHolder data={i} key={i._id} />;
      })}
    </div>
  );
}

export default WishlistMap;

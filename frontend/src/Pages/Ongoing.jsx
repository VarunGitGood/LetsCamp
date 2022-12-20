import React, { useState } from "react";
import NavBar from "../components/UI/NavBar";
import { FetchData } from "../utils/REST";
import { useEffect } from "react";
import Loading from "../components/UI/Loading";
import WishlistHolder from "../components/UI/WishlistHolder";
import s from "../styles/Wishlist.module.css";

function OngoingMap({ data }) {
  return (
    <div className={s.wishlist}>
      <div>
        <h1>Enrolled Bootcamps</h1>
      </div>
      {data.map((i) => {
        return <WishlistHolder data={i} key={i._id} />;
      })}
    </div>
  );
}

function Ongoing() {
  const [loading, setLoading] = useState(true);
  const [ongoing, setOngoing] = useState([]);

  const getOngoing = async () => {
    try {
      const results = await FetchData(
        "/bootcamps/ongoing",
        true,
        window.localStorage.getItem("token")
      );
      setLoading(false);
      setOngoing(results.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOngoing();
  }, []);

  return (
    <>
      <NavBar />
      {loading && <Loading flag={loading} />}
      <OngoingMap data={ongoing} />
    </>
  );
}

export default Ongoing;

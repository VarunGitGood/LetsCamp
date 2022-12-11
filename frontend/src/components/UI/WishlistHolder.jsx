import { motion } from "framer-motion";
import s from "../../styles/BootcamperHolder.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FetchData } from "../../utils/REST";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Rating from "@mui/material/Rating";

function WishlistHolder(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  let date = new Date(props.data.createdAt).toDateString();

  const fetchBootcampUser = async () => {
    const results = await FetchData(
      `/auth/users/${props.data.user}`,
      true,
      window.localStorage.getItem("token")
    );
    setUser(results.data.data);
  };
  useEffect(() => {
    fetchBootcampUser();
  }, []);

  return (
    <motion.div className={s.holder} whileHover={{ scale: 1.01 }}>
      <div
        className={s.img}
        onClick={() => {
          navigate(`/bootcamps/${props.data._id}`);
        }}
      >
        <img
          src="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          height="128px"
          width="200px"
        />
      </div>
      <div
        className={s.det}
        onClick={() => {
          navigate(`/bootcamps/${props.data._id}`);
        }}
      >
        <h2>{props.data.name}</h2>
        <p>{props.data.description}</p>
        <p>
          Created by{" "}
          <p style={{ color: "#6741c7", fontWeight: "900" }}>
            {user && user.name}
          </p>
        </p>
        <p>
          Created on{" "}
          <p style={{ color: "#6741c7", fontWeight: "900" }}>{date}</p>
        </p>
        <span>
          <Rating
            name="read-only"
            value={props.data.averageRating}
            readOnly
            precision={0.5}
            defaultValue={3.5}
          />
        </span>
        <span style={{ fontWeight: "600" }}>
          {" "}
          <CurrencyRupeeIcon />
          {props.data.averageCost}
        </span>
      </div>
    </motion.div>
  );
}

export default WishlistHolder;

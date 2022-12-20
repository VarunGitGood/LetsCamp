import { motion } from "framer-motion";
import s from "../../styles/BootcamperHolder.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FetchData, postData } from "../../utils/REST";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";

const likeStyle = {
  "&:hover": {
    color: "#6741C7",
    transform: "scale(1.1)",
  },
};

function BootcampHolder(props) {
  const navigate = useNavigate();
  const [like, setLike] = useState(props.likes);
  let date = new Date(props.data.createdAt).toDateString();

  // const flag =

  const likeBootcamp = async () => {
    const results = await postData(
      `/bootcamps/${props.data._id}/like`,
      true,
      window.localStorage.getItem("token")
    );
    setLike(true);
  };

  const unlikeBootcamp = async () => {
    const results = await postData(
      `/bootcamps/${props.data._id}/unlike`,
      true,
      window.localStorage.getItem("token")
    );
    setLike(false);
  };

  return (
    <motion.div className={s.holder} whileHover={{ scale: 1.01 }}>
      <div
        className={s.img}
        onClick={() => {
          navigate(`/bootcamps/${props.data._id}`);
        }}
      >
        {/* generate   photo of computer url from pexels */}
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
            {props.data.userName}
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
          />
        </span>
        <span style={{ fontWeight: "600" }}>
          {" "}
          <CurrencyRupeeIcon />
          {props.data.averageCost}
        </span>
      </div>
      <div className={s.like}>
        {like ? (
          <FavoriteIcon onClick={unlikeBootcamp} sx={{ color: "#C70303" }} />
        ) : (
          <FavoriteBorderIcon onClick={likeBootcamp} sx={likeStyle} />
        )}
      </div>
    </motion.div>
  );
}

export default BootcampHolder;

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "../../styles/BootcamperHolder.module.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Rating from "@mui/material/Rating";
import { motion } from "framer-motion";
import { UserContext } from "../../context/UserContext";
import { Button } from "@mui/material";

function AddedBootcamps(props) {
  const navigate = useNavigate();
  const userDetails = useContext(UserContext).user;
  let date = new Date(props.data.createdAt).toDateString();
  console.log(props.data._id);

  const buttonSX = {
    borderColor: "#6741C7",
    color: "#6741C7",
    width: "50%",
    margin: "1rem",
    "&:hover": {
      bgcolor: "#6741C7",
      color: "white",
    },
  };

  return (
    <motion.div className={s.holderA} whileHover={{ scale: 1.01 }}>
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
            {userDetails && userDetails.name}
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
      <div className={s.likeA}>
        <Button
          variant="outlined"
          onClick={() => props.onDelete({ id: props.data._id })}
          sx={buttonSX}
        >
          X
        </Button>
      </div>
    </motion.div>
  );
}

export default AddedBootcamps;

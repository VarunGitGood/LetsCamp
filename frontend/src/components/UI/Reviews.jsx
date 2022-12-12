import { useEffect, useState } from "react";
import { deleteData, FetchData } from "../../utils/REST";
import AddReview from "./AddReview";
import ReviewCard from "./ReviewCard";
import s from "../../styles/Review.module.css";
import { Box } from "@mui/material";

function Reviews({ id }) {
  const [reviews, setReviews] = useState([]);
  const token = window.localStorage.getItem("token");
  const getReview = async () => {
    const results = await FetchData(`/bootcamps/${id}/reviews`, true, token);
    setReviews(results.data.data);
  };

  const addHandler = (data) => {
    setReviews((prev) => [...prev, data]);
  };

  const deleteHandler = (rid) => {
    deleteData(`/bootcamps/${id}/reviews/${rid}`, true, token);
    setReviews(reviews.filter((i) => i._id !== rid));
  };

  useEffect(() => {
    getReview();
  }, []);

  return (
    <div className={s.layout}>
      <AddReview id={id} onAdd={addHandler} />
      <Box sx={{ display: "flex", flexWrap: "wrap" , gap:"8px"}}>
      {reviews.map((review) => {
        return <ReviewCard review={review} onDelete={deleteHandler} />;
      })}
      </Box>
    </div>
  );
}

export default Reviews;

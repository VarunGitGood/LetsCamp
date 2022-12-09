import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import s from "../../styles/reviewForm.module.css";

import { useForm } from "react-hook-form";
import { postData } from "../../utils/REST";
import { UserContext } from "../../context/UserContext";

function AddReview({ id, onAdd }) {
  const [flag, setFlag] = React.useState(false);
  const [value, setValue] = React.useState(3);
  const { register, handleSubmit } = useForm();
  const user = useContext(UserContext).user;
 

  const submitHandler = async (data) => {
    try{
      let finalData = {
        ...data,
        rating: value,
      };
      const result = await postData(
        `/bootcamps/${id}/reviews`,
        true,
        window.localStorage.getItem("token"),
        finalData
      );
      onAdd(result.data.data);
      setFlag(!flag);
    }
    catch(err){
      // use toastify later
      if(user.role === "publisher"){
        window.alert("You are not allowed to review this bootcamp")
      }
      if(err.response.status === 400){
        window.alert("You have already reviewed this bootcamp")
      }
      setFlag(!flag);
    }
  };

  return (
    <>
      {flag ? (
        <div className={s.con}>
          <h2>Add review</h2>
          <form className={s.form} onSubmit={handleSubmit(submitHandler)}>
            <Typography component="legend">Rating</Typography>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              size="large"
            />
            <TextField
              label="Title"
              name="title"
              style={{ width: "350px" }}
              margin="dense"
              {...register("title")}
              required
            />
            <TextField
              label="Description"
              name="text"
              style={{ width: "350px" }}
              margin="dense"
              {...register("text")}
              required
              multiline
              rows={4}
            />
            <Button
              variant="contained"
              type="submit"
              style={{ width: "350px", marginTop: "8px" }}
            >
              Submit
            </Button>
          </form>
        </div>
      ) : (
        <Button variant="contained" onClick={() => setFlag(true)}>
          Add Review
        </Button>
      )}
    </>
  );
}

export default AddReview;

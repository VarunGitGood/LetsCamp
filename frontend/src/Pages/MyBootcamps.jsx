import React, { useEffect } from "react";
import NavBar from "../components/UI/NavBar";
import { deleteData, FetchData } from "../utils/REST";
import s from "../styles/MyBootcamps.module.css";
import AddedBootcamps from "../components/UI/AddedBootcamps";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Loading from "../components/UI/Loading";

const buttonStyle = {
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  cursor: "pointer",
  fontSize: "1rem",
  backgroundColor: "#6741C7",
  color: "white",
  fontWeight: "bold",
};

function MyBootcampsList({ mybootcamps, deleteHandler, updateHandler }) {
  return (
    <div className={s.MyBootcamps}>
      {mybootcamps.map((index) => {
        return (
          <AddedBootcamps
            data={index}
            key={index._id}
            onDelete={deleteHandler}
            onUpdate={updateHandler}
          />
        );
      })}
    </div>
  );
}

function MyBootcampsNav({ navigate }) {
  return (
    <div className={s.nav}>
      <h1>My Bootcamps</h1>
      <div>
        <Button
          variant="contained"
          onClick={() => navigate("/addbootcamp")}
          style={buttonStyle}
        >
          New Bootcamp
        </Button>
      </div>
    </div>
  );
}

function MyBootcamps() {
  const navigate = useNavigate();
  const [mybootcamps, setMybootcamps] = React.useState([]);
  const token = window.localStorage.getItem("token");
  const [loading, setLoading] = React.useState(true);

  const fetchMyBootcamps = async () => {
    const results = await FetchData("/bootcamps/mybootcamps", true, token);
    setLoading(false);
    setMybootcamps(results.data.data);
  };

  const deleteHandler = ({ id }) => {
    deleteData(`/bootcamps/${id}`, true, token);
    setMybootcamps(mybootcamps.filter((i) => i._id !== id));
  };

  const updateHandler = ({ id }) => {};

  useEffect(() => {
    fetchMyBootcamps();
  }, []);

  return (
    <>
      <NavBar />
      {loading && <Loading flag={loading} />}
      <MyBootcampsNav navigate={navigate} />
      <MyBootcampsList
        mybootcamps={mybootcamps}
        deleteHandler={deleteHandler}
        updateHandler={updateHandler}
      />
    </>
  );
}

export default MyBootcamps;

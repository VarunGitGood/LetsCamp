import React, { useEffect } from "react";
import NavBar from "../components/UI/NavBar";
import { deleteData, FetchData } from "../utils/REST";
import s from "../styles/MyBootcamps.module.css";
import AddedBootcamps from "../components/UI/AddedBootcamps";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function MyBootcamps() {
  const navigate = useNavigate();
  const [mybootcamps, setMybootcamps] = React.useState([]);
  const token = window.localStorage.getItem("token");

  const buttonStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontSize: "1rem",
    backgroundColor: "#6741C7",
    color: "white",
    fontWeight: "bold",
  }

  const fetchMyBootcamps = async () => {
    const results = await FetchData("/bootcamps/mybootcamps", true, token);
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
    <div>
      <NavBar />
      <div>
        <div className={s.nav}>
          <h1>My Bootcamps</h1>
          <div>
            <Button
              variant="contained"
              onClick={() => navigate("/addbootcamp")}
              style={buttonStyle}
            >
              Add New Bootcamp
            </Button>
          </div>
        </div>
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
      </div>
    </div>
  );
}

export default MyBootcamps;

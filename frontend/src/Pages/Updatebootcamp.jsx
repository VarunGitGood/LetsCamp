import React from "react";
import { useParams } from "react-router-dom";
import BootcampForm from "../components/UI/BootcampForm";
import NavBar from "../components/UI/NavBar";
import { putData } from "../utils/REST";
import { AuthContext } from "../context/AuthContext";

function Updatebootcamp() {
  const { id } = useParams();
  const token = window.localStorage.getItem("token");
  const { user } = React.useContext(AuthContext);
  console.log(id);
  console.log(user);

  const submitHandler = async (data) => {
    try {
        const result = await putData(`/bootcamps/${id}`, true, token, data);
        console.log(result);
        window.alert("Bootcamp updated successfully");
    } catch (error) {
        window.alert("Bootcamp update failed");
    }
  };
  return (
    <div>
      <NavBar />
      <h1>Update Details</h1>
      <BootcampForm onSubmit={submitHandler} />
    </div>
  );
}

export default Updatebootcamp;

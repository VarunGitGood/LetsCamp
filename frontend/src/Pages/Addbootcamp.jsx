import React from "react";
import NavBar from "../components/UI/NavBar";
import { postData } from "../utils/REST";
import BootcampForm from "../components/UI/BootcampForm";

function Addbootcamp() {
  const token = window.localStorage.getItem("token");

  const submitHandler = async (data) => {
    try {
      const result = await postData("/bootcamps", true, token, data);
      window.alert("Bootcamp added successfully");
    } catch (error) {
      window.alert("Bootcamp add failed");
    }
  };

  // add visual confirmation that the bootcamp was added

  return (
    <>
      <NavBar />
      <BootcampForm onSubmit={submitHandler} />
    </>
  );
}

export default Addbootcamp;

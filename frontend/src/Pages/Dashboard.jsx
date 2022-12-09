import React, { useContext, useEffect, useState } from "react";
import BootcampHolder from "../components/UI/BootcampHolder";
import { AuthContext } from "../context/AuthContext";
import { FetchData } from "../utils/REST";
import s from "../styles/Dashboard.module.css";
import NavBar from "../components/UI/NavBar";
import { useNavigate } from "react-router-dom";
import Filter from "../components/UI/Filter";

function Dashboard() {
  const auth = useContext(AuthContext);
  const [bootcamps, setBootcamps] = useState([]);
  const [path, setPath] = useState("/bootcamps");
  const navigate = useNavigate();

  const fetchBootcamps = async () => {
    const results = await FetchData(path, false, null);
    setBootcamps(results.data.data);
  };
  useEffect(() => {
    fetchBootcamps();
  }, []);
  return (
    <>
      <NavBar />
      <div className={s.layout}>
        <div className={s.bootcamps}>
          {bootcamps.map((i) => {
            return <BootcampHolder data={i} key={i._id} />;
          })}
        </div>
        <div className={s.filter}>
          <Filter />
        </div>
      </div>

      <button
        onClick={() => {
          auth.logout();
          navigate("/");
        }}
      >
        Logout
      </button>
    </>
  );
}

export default Dashboard;

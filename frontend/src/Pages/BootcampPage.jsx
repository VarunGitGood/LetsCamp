import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { FetchData } from "../utils/REST";
import NavBar from "../components/UI/NavBar";
import s from "../styles/BootcampPage.module.css";
import Reviews from "../components/UI/Reviews";
import MainPge from "../components/UI/MainPge";
import { UserContext } from "../context/UserContext";

function BootcampDisplay({ bootcamp, id , role}) {
  return (
    <>
      {bootcamp && (
        <div className={s.container}>
          <MainPge data={bootcamp} user={role}/>
          <div className={s.reviews}>
            <Reviews id={id} />
          </div>
        </div>
      )}
    </>
  );
}

function BootcampPage() {
  const { id } = useParams();
  const [bootcamp, setBootcamp] = useState(null);
  const user = useContext(UserContext).user;

  const fetchBootcamp = async () => {
    const results = await FetchData(
      `/bootcamps/${id}`,
      true,
      window.localStorage.getItem("token")
    );
    setBootcamp(results.data.data);
  };

  useEffect(() => {
    fetchBootcamp();
  }, []);

  return (
    <>
      <NavBar />
      <BootcampDisplay bootcamp={bootcamp} id={id} role={user} />
    </>
  );
}

export default BootcampPage;

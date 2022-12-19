import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FetchData } from "../utils/REST";
import NavBar from "../components/UI/NavBar";
import s from "../styles/BootcampPage.module.css";
import Reviews from "../components/UI/Reviews";
import MainPge from "../components/UI/MainPge";

function BootcampDisplay({ bootcamp, id }) {
  return (
    <>
      {bootcamp && (
        <div className={s.container}>
          <MainPge data={bootcamp} />
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
      <BootcampDisplay bootcamp={bootcamp} id={id} />
    </>
  );
}

export default BootcampPage;

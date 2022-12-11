import { useContext, useEffect, useState } from "react";
import BootcampHolder from "../components/UI/BootcampHolder";
import { FetchData } from "../utils/REST";
import s from "../styles/Dashboard.module.css";
import NavBar from "../components/UI/NavBar";
import Filter from "../components/UI/Filter";
import { UserContext } from "../context/UserContext";
import Quotes from "../components/UI/Quotes";

function Dashboard() {
  const [bootcamps, setBootcamps] = useState([]);
  const [path, setPath] = useState("/bootcamps");
  const userDetails = useContext(UserContext).user;

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
            let liked = false;
            if (userDetails && userDetails.likes.includes(i._id)) {
              liked = true;
            }
            return <BootcampHolder data={i} key={i._id} likes={liked} />;
          })}
        </div>
        <div className={s.misc}>
          <Filter />
          <Quotes />
        </div>
      </div>
    </>
  );
}

export default Dashboard;

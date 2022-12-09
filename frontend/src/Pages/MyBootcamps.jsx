import React, { useEffect } from "react";
import NavBar from "../components/UI/NavBar";
import { deleteData, FetchData } from "../utils/REST";
import s from "../styles/MyBootcamps.module.css";
import AddedBootcamps from "../components/UI/AddedBootcamps";
import { useNavigate } from "react-router-dom";

function MyBootcamps() {
  const navigate = useNavigate();
  const [mybootcamps, setMybootcamps] = React.useState([]);
  const token = window.localStorage.getItem("token");

  const fetchMyBootcamps = async () => {
    const results = await FetchData("/bootcamps/mybootcamps", true, token);
    setMybootcamps(results.data.data);
  };

  const deleteHandler = ({ id }) => {
    deleteData(`/bootcamps/${id}`, true, token);
    setMybootcamps(mybootcamps.filter((i) => i._id !== id));
   
  };
  
  const updateHandler = ({id}) => {
    
  };

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
            <button onClick={() => {
              navigate('/addbootcamp')
            }}>Add New</button>
          </div>
        </div>
        <div>
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

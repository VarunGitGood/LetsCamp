import React , {useState }from "react";
import { useNavigate } from "react-router-dom";
import s from "../../styles/AddedBootcamps.module.css";

function AddedBootcamps(props) {
  const navigate = useNavigate();
  const [img, setImg] = useState();
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };

  const submitHandler = (data) => {
    data.preventDefault();
    console.log(data);
  }

  return (
    <div>
      <div
        onClick={() => {
          navigate(`/bootcamps/${props.data._id}`);
        }}
        className={s.holder}
      >
        <p>{props.data._id}</p>
        <p>{props.data.name}</p>
      </div>
      <button
        onClick={() => {
          props.onDelete({ id: props.data._id });
        }}
      >
        Delete
      </button>
      {/* open Modal on add photo*/}
      {/* <form onSubmit={submitHandler}>
      <input type="file" name="photo" onChange={onImageChange}/>
      <button
        type="submit"
      >
        Add Photo
      </button>
      </form> */}
      {/*  */}
       {/* <img src={img} alt="" width="200px" height="200px"/> */}
      <button onClick={()=> {
        
      }}>
        Update
      </button>
     
    </div>
  );
}

export default AddedBootcamps;

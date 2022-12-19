import React from "react";
import { useState } from "react";
import axios from "axios";
function AddPhoto() {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const uploadImage = async () => {
    try {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "client");
      data.append("cloud_name", "dj7sgyf4z");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dj7sgyf4z/image/upload",
        data
      );
      console.log(res.data.url);
      setUrl(res.data.url);
    } catch (error) {}
  };
  return (
    <div>
      <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
      <button onClick={uploadImage}>Upload</button>
    </div>
  );
}

export default AddPhoto;

import { Button, Chip, Paper } from "@mui/material";
import React from "react";
import s from "../../styles/BootcampPage.module.css";
import Checkbox from "@mui/material/Checkbox";
import Rating from "@mui/material/Rating";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { FetchData } from "../../utils/REST";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CheckboxStyle = {
  color: "#6741C7",
  "&.Mui-checked": {
    color: "#6741C7",
  },
};

const ChipStyle = {
  backgroundColor: "#6741C7",
  color: "white",
  marginRight: "1rem",
  fontWeight: "bold",
  fontFamily: "Poppins",
  width: "fit-content",
  marginBottom: "1rem",
};

const ButtonStyle = {
  backgroundColor: "#6741C7",
  color: "white",
  fontWeight: "bold",
  fontFamily: "Poppins",
  width: "100%",
  fontSize: "14px",
  "&:hover": {
    backgroundColor: "#6741C7",
  },
};

function MainPge({ data, user }) {
  const { id } = useParams();
  const [num, setNum] = useState(0);
  const [enrolled, setEnrolled] = useState(false);

  const enrollUser = async () => {
    try {
      const results = await FetchData(
        `/bootcamps/${id}/enroll`,
        true,
        window.localStorage.getItem("token")
      );
      setEnrolled(true);
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNum = async () => {
    const results = await FetchData(
      `/bootcamps/${id}/enrolled`,
      true,
      window.localStorage.getItem("token")
    );
    setNum(results.data.data);
    console.log(results.data.data);
  };

  const isEnrolled = async () => {
    try {
      const results = await FetchData(
        `/bootcamps/${id}/isEnrolled`,
        true,
        window.localStorage.getItem("token")
      );
      setEnrolled(results.data.data);
      console.log(results.data.data);
    } catch (error) {
      console.log(error);
    }
    
  };

  useEffect(() => {
    fetchNum();
    isEnrolled();
  }, []);
  return (
    <div className={s.main}>
      <div className={s.header}>
        <div className={s.header__right}>
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: 0,
            }}
          >
            <Rating
              name="read-only"
              value={data.averageRating}
              readOnly
              precision={0.1}
            />
            <span>Completed by {num}</span>
          </p>
          <p
            style={{
              marginBottom: "0",
            }}
          >
            Created by:{" "}
            <span
              style={{
                fontWeight: "bold",
                marginRight: "1rem",

                color: "#6741C7",
              }}
            >
              {data.userName}
            </span>
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                marginBottom: "0rem",
              }}
            >
              Cost:
              <CurrencyRupeeIcon sx={{ fontWeight: "900", fontSize: "1rem" }} />
              <p>{data.averageCost}</p>
            </p>
            {user.role == "user" && (
              <span>
                {enrolled ? (
                  <Button variant="contained" sx={ButtonStyle} disabled>
                    Enrolled
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={ButtonStyle}
                    onClick={enrollUser}
                  >
                    Enroll
                  </Button>
                )}
              </span>
            )}
          </div>
        </div>
        <div
          style={{
            width: "45%",
            height: "100%",
          }}
        >
          <img
            src={data.photo}
            alt="img"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "14px",
            }}
          />
        </div>
      </div>
      <div className={s.details}>
        <div className={s.detail}>
          <div>
            <h2>Details</h2>
            <p>
              <span
                style={{
                  fontWeight: "bold",
                  marginRight: "1rem",
                  color: "#6741C7",
                }}
              >
                Website :
              </span>
              <a href={data.website}>{data.website}</a>
            </p>
            <p>
              <span
                style={{
                  fontWeight: "bold",
                  marginRight: "1rem",
                  color: "#6741C7",
                }}
              >
                Email :
              </span>
              {data.email}
            </p>
            <p>
              <span
                style={{
                  fontWeight: "bold",
                  marginRight: "1rem",
                  color: "#6741C7",
                }}
              >
                Phone :
              </span>
              {data.phone}
            </p>
            <p>
              <span
                style={{
                  fontWeight: "bold",
                  marginRight: "1rem",
                  color: "#6741C7",
                }}
              >
                Address :
              </span>
              {data.address}
            </p>
          </div>
          <div></div>
        </div>
        <div
          style={{
            backgroundColor: "#F3F5F9",
            padding: "1rem",
            borderRadius: "14px",
            marginBottom: "2rem",
          }}
        >
          {" "}
          <h3>Available Careers : </h3>
          {data.careers.map((career) => (
            <Chip label={career} sx={ChipStyle} />
          ))}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "flex-start",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            <span>
              Does this bootcamp offer housing?{" "}
              {data.housing ? (
                <Checkbox defaultChecked disabled sx={CheckboxStyle} />
              ) : (
                <Checkbox disabled sx={CheckboxStyle} />
              )}
            </span>
            <span>
              Does this bootcamp offer job assistance?{" "}
              {data.jobAssistance ? (
                <Checkbox defaultChecked disabled sx={CheckboxStyle} />
              ) : (
                <Checkbox disabled sx={CheckboxStyle} />
              )}
            </span>
            <span>
              Does this bootcamp offer job guarantee?{" "}
              {data.jobGuarantee ? (
                <Checkbox defaultChecked disabled sx={CheckboxStyle} />
              ) : (
                <Checkbox disabled sx={CheckboxStyle} />
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPge;

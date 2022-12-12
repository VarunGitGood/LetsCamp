import { Button, Select, MenuItem, InputLabel } from "@mui/material";
import React from "react";
import { useState } from "react";
import s from "../../styles/Dashboard.module.css";

const labelStyle = {
  fontSize: "1rem",
  fontWeight: "bold",
  marginBottom: "0.3rem",
  fontFamily: "Poppins",
};

const selectStyle = {
  width: "100%",
  marginBottom: "0.5rem",
};

const buttonStyle = {
  width: "50%",
  fontSize: "1rem",
  fontWeight: "bold",
  fontFamily: "Poppins",
  marginBottom: "0.5rem",
  backgroundColor: "#6741C7",
  color: "white",
  "&:hover": {
    backgroundColor: "#6741C7",
  },
};

const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Varanasi",
  "Srinagar",
  "Aurangabad",
  "Jalandhar",
  "Bhubaneswar",
  "Salem",
  "Warangal",
  "Mira-Bhayandar",
  "Thiruvananthapuram",
  "Bhiwandi",
  "Saharanpur",
  "Gorakhpur",
  "Guntur",
  "Bikaner",
  "Amravati",
  "Noida",
  "Jamshedpur",
  "Bhilai Nagar",
  "Cuttack",
  "Firozabad",
  "Kochi",
  "Nellore",
  "Bhavnagar",
  "Dehradun",
  "Durgapur",
  "Asansol",
  "Raurkela",
  "Nanded",
  "Kolhapur",
  "Ajmer",
  "Akola",
  "Gulbarga",
  "Jamnagar",
  "Ujjain",
  "Loni",
  "Siliguri",
  "Jhansi",
  "Ulhasnagar",
  "Jammu",
  "Sangli",
  "Erode",
  "Tirun",
];

function Filter(props) {
  const [city, setCity] = useState("");
  const [housing, setHousing] = useState("");
  const [jobGuarantee, setJobGuarantee] = useState("");
  const [sort, setSort] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "city") {
      setCity(e.target.value);
    } else if (e.target.name === "housing") {
      setHousing(e.target.value);
    } else if (e.target.name === "jobGuarantee") {
      setJobGuarantee(e.target.value);
    } else if (e.target.name === "sort") {
      setSort(e.target.value);
    }
  };

  const handleClick = () => {
    let str = "/bootcamps?";
    if (city) {
      str += `city=${city}`;
    }
    if (housing) {
      str += `&housing=${housing}`;
    }
    if (jobGuarantee) {
      str += `&jobGuarantee=${jobGuarantee}`;
    }
    if (sort) {
      if (sort == "averageRating") {
        str += `&orderBy=${sort}`;
      } else {
        str += `&sort=${sort}`;
      }
    }
    props.onChange(str);
  };

  const resetHandler = () => {
    setCity("");
    setHousing("");
    setJobGuarantee("");
    setSort("");
    props.onChange("/bootcamps");
  };

  return (
    <div className={s.filter}>
      <InputLabel id="city" sx={labelStyle}>
        City
      </InputLabel>
      <Select
        value={city}
        label="City"
        onChange={handleChange}
        name="city"
        id="city"
        sx={selectStyle}
      >
        {cities.map((city) => (
          <MenuItem value={city}>{city}</MenuItem>
        ))}
      </Select>
      <InputLabel id="housing" sx={labelStyle}>
        Housing
      </InputLabel>
      <Select
        value={housing}
        label="Housing"
        onChange={handleChange}
        name="housing"
        id="housing"
        sx={selectStyle}
      >
        <MenuItem value={true}>True</MenuItem>
        <MenuItem value={false}>False</MenuItem>
      </Select>
      <InputLabel id="jobGuarantee" sx={labelStyle}>
        Job Guarantee
      </InputLabel>
      <Select
        value={jobGuarantee}
        label="Job Guaratee"
        onChange={handleChange}
        name="jobGuarantee"
        id="jobGuarantee"
        sx={selectStyle}
      >
        <MenuItem value={true}>True</MenuItem>
        <MenuItem value={false}>False</MenuItem>
      </Select>
      <InputLabel id="sort" sx={labelStyle}>
        Sort By
      </InputLabel>
      <Select
        value={sort}
        label="Sort By"
        onChange={handleChange}
        name="sort"
        id="sort"
        sx={selectStyle}
      >
        <MenuItem value={"averageCost"}>By Cost</MenuItem>
        <MenuItem value={"averageRating"}>By Review</MenuItem>
      </Select>
      <div className={s.control}>
        <Button onClick={handleClick} sx={buttonStyle}>
          Filter
        </Button>
        <Button onClick={resetHandler} sx={buttonStyle}>
          Reset
        </Button>
      </div>
    </div>
  );
}

export default Filter;

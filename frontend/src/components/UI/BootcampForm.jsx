import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import s from "../../styles/Addbootcamp.module.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;


const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
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

const Careers = [
  "Web Development",
  "Mobile Development",
  "UI/UX",
  "Data Science",
  "Business",
  "Other",
];

function BootcampForm(props) {
  //   const preLoaded = {
  //     name: props.data.name,
  //     description: props.data.description,
  //     website: props.data.website,
  //     phone: props.data.phone,
  //     email: props.data.email,
  //     careers: props.data.careers,
  //     housing: props.data.housing,
  //     jobAssistance: props.data.jobAssistance,
  //     jobGuarantee: props.data.jobGuarantee,
  //     averageCost: props.data.averageCost,
  //   };

  const { register, handleSubmit } = useForm();
  const [career, setCareer] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCareer(typeof value === "string" ? value.split(",") : value);
  };

  const submitHandler = async (data) => {
    const finalData = {
      ...data,
      careers: career,
    };
    props.onSubmit(finalData);
  };

  return (
    <div style={{ marginTop: "9rem"}}>
      <h1>Details</h1>
      <div className={s.layout}>
        <form className={s.form} onSubmit={handleSubmit(submitHandler)}>
          <div className={s.a}>
            <TextField
              label="Name"
              name="name"
              {...register("name")}
              required
            />
            <TextField
              label="Description"
              name="description"
              multiline
              maxRows={4}
              {...register("description")}
              required
            />
            <TextField
              label="Website"
              name="website"
              {...register("website")}
              required
            />
            <TextField
              label="Phone"
              name="phone"
              {...register("phone")}
              required
            />
            <TextField
              label="Email"
              name="email"
              {...register("email")}
              required
            />
            <TextField
              label="Address"
              name="address"
              multiline
              maxRows={5}
              {...register("address")}
              required
            />
          </div>
          <div className={s.a}>
            <InputLabel id="city">City</InputLabel>
            <Select labelId="city" id="city" {...register("city")} required>
              {cities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
            <InputLabel id="career">Career</InputLabel>
            <Select
              labelId="career"
              id="career"
              multiple
              value={career}
              onChange={handleChange}
              input={<OutlinedInput label="Career" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {Careers.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={career.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
            <label htmlFor="housing">Housing Available</label>
            <select
              id="housing"
              name="housing"
              required
              {...register("housing")}
            >
              <option value="false">Select housing</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <label htmlFor="housing">Job Assistance</label>
            <select
              id="jobAssistance"
              name="jobAssistance"
              required
              {...register("jobAssistance")}
            >
              <option value="false">Select job assistance</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <label htmlFor="jobGuarantee">Job Guarantee</label>
            <select
              id="jobGuarantee"
              name="jobGuarantee"
              required
              {...register("jobGuarantee")}
            >
              <option value="false">Select Job Guarantee</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <TextField
              label="Average Cost"
              name="averageCost"
              required
              style={{ width: "350px", marginTop: "10px" }}
              type="number"
              {...register("averageCost")}
            />
            <Button
              variant="contained"
              type="submit"
              style={{ width: "350px", marginTop: "10px" }}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BootcampForm;

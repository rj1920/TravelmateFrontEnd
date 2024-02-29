import React, { useEffect, useState } from "react";
import styled from "styled-components";
import homeImage from "../assets/video.mp4";
import { Typewriter } from "react-simple-typewriter"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {getAllCities} from "../services/city-service";
import {getPkgByDestination} from "../services/admin/packageService";
import { Input } from "reactstrap";

export default function Hero() {
  const[pkdata,setpkdata]=useState({
    destinationCity:"",
    fromCity:"",
    checkin:"",
    checkout:""
  });
  useEffect(() => {
  }, [pkdata]);

  const [cities, setCities] = useState([]);

  useEffect(() => {
    getCities();
  }, []);
  const getCities = (event) => {
    getAllCities()
      .then((resp) => {
        console.log(resp);
        setCities(resp);
      })
      .catch((error) => {
        console.log("Error log" + error);
        toast.error("Eror while getting City data", {
          autoClose: 20000, // Adjust the time in milliseconds (e.g., 8000ms = 8 seconds)
        });
      });
  };
  const navigate = useNavigate();

  const handleChange = (event, property) => {
      setpkdata({ ...pkdata, [property]: event.target.value });
  };
  const isValidPkgData = (pkdata) => {
    var invalidCount = 0;
    if (pkdata.fromCity === pkdata.destinationCity) {
      invalidCount++;
      toast.error("From city & destination city can't be same",{
        autoClose: 20000, // Adjust the time in milliseconds (e.g., 8000ms = 8 seconds)
    });
    }
    return (invalidCount === 0) ? true : false;
  };
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

const pkgview=(event)=>{
  event.preventDefault();
  console.log(pkdata);
  
  if (isValidPkgData(pkdata)) {
    getPkgByDestination(pkdata.destinationCity)
      .then((resp) => {
        console.log(resp);
        console.log("Pkg found successfully");
        localStorage.setItem("fromCity",pkdata.fromCity);
        localStorage.setItem("destinationCity",pkdata.destinationCity);
        localStorage.setItem("checkin",pkdata.checkin);
        localStorage.setItem("checkout",pkdata.checkout);
        navigate("/allpackages/filterByCity");
      })
      .catch((error) => {
        console.log("Error log" + error);
        toast.error('Error while adding data to flight', {
          autoClose: 20000, // Adjust the time in milliseconds (e.g., 8000ms = 8 seconds)
        });
        setError({
          errors: error,
          isError: true,
        });
      });
  }
};
  return (
    <Section id="hero">
      <div className="background">
        <video
        src={homeImage} 
        autoPlay
        loop
        muted/>
      </div>
      <div className="content">
        <div className="title">
          <h1>
            WHERE YOU WOULD LIKE TO GO?
          <Typewriter words={[" KOCHI"," JODHPUR"," MUMBAI"," LEH"," GOA"]} loop cursor cursorStyle='|' typeSpeed={70} deleteSpeed={50} delaySpeed={1000} />
          </h1>
        </div>
        <form>
        <div className="search">
        <div className="container">
            <b><label htmlFor="">Source</label></b>
      <select name="fromCity" onChange={(e) => handleChange(e, "fromCity")} style={{backgroundColor:"transparent",border:"transparent"}}>
        <option selected>Select the Source City</option>
          {cities.map((city,i)=> {
            return(<option value={city.cityName} key={i}>{city.cityName}</option>);
            })}
        </select>

            {/* <input type="text" name="fromCity" placeholder="Search Your start point" value={pkdata.fromCity}
            onChange={(e) => handleChange(e, "fromCity")}/> */}
          </div>
          <div className="container">
            <b><label htmlFor="">Destination</label></b>
            <select name="destinationCity" onChange={(e) => handleChange(e, "destinationCity")} style={{backgroundColor:"transparent",border:"transparent"}}>
            <option selected>Select the Destination City</option>
          {cities.map((city,i)=> {
            return(<option value={city.cityName} key={i}>{city.cityName}</option>);
              
            })}
        </select>
            {/* <input type="text" name="destinationCity" placeholder="Search Your destination" 
            value={pkdata.destinationCity}
            onChange={(e) => handleChange(e, "destinationCity")} */}
            {/* /> */}
          </div>
          <div className="container">
            <b>
            <label htmlFor="">Check-in</label></b>
            <input type="date" name="checkin"  onChange={(e) => handleChange(e, "checkin")}/>
          </div>
          <div className="container">
            <b><label htmlFor="">Check-out</label></b>
            <input type="date" name="checkout"  onChange={(e) => handleChange(e, "checkout")}/>
          </div>
          <b><button type="submit" onClick={pkgview}>Go</button></b>
        </div>
        </form>
      </div>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  width: 100%;
  height: 100%;

  .background {
    video {
      object-fit: cover;
      top: 0;
      left: 0;
      width: 100%;
      height: 540px;
      filter: brightness(60%);
    }
  }
  .content {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 3;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .title {
      color: white;
      h1 {
        font-size: 2rem;
        letter-spacing: 0.2rem;
      }
    }
    .search {
      display: flex;
      background-color: #ffffffce;
      border-radius:5rem;
      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        label {
          font-size: 1rem;
          color: #03045e;
        }
        input {
          background-color: transparent;
          border: none;
          text-align: center;
          font-size: rem;
          color: black;
          &[type="date"] {
            padding-left: 3rem;
          }

          &::placeholder {
            color: black;
          }
          &:focus {
            outline: none;
          }
        }
      }
      button {
        padding: 1rem;
        cursor: pointer;
        border-radius: 4rem;
        border: none;
        color: white;
        background-color: #4361ee;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: #023e8a;
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 980px) {
    .background {
      video {
        height: 100%;
      }
    }
    .content {
      .title {
        h1 {
          font-size: 1rem;
        }
      }
      .search {
        flex-direction: row;
        padding: 0.8rem;
        font-size:0.5rem;
        gap: 0.8rem;
        /* padding: 0; */
        .container {
          padding: 0 0.8rem;
          font-size:0.1rem;
          input[type="date"] {
            padding-left: 1rem;
          }
        }
        button {
          padding: 1rem;
          font-size: 0.7rem;
        }
        /* display: none; */
      }
    }
  }
`;
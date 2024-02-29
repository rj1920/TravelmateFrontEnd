import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Base from './base';
import { NavLink as ReactLink } from "react-router-dom";
import { getPkgByDestination } from "../services/admin/packageService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {getAllCities} from "../services/city-service";
import info1 from "../assets/info1.png";
import info2 from "../assets/info2.png";
import info3 from "../assets/info3.png";
import { BASE_URL } from "../services/helper";
const AllPackages=()=>{
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const [packages, setpackages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getpackages();
  }, []);

  const getpackages = (event) => {
    getPkgByDestination(localStorage.getItem("destinationCity"))
      .then((resp) => {
        if(resp.length===0){
          toast.error("No Package found");
          navigate("/home");
        }
        else{
          toast.success("Found Packages successfully", {
            autoClose: 20000, // Adjust the time in milliseconds (e.g., 8000ms = 8 seconds)
          });

        }
        console.log(resp);
        resp.forEach(pkg => {
          pkg.imgPath = BASE_URL + "/package/serve/" + pkg.packageId + "/"+ pkg.imgPath.substring(pkg.imgPath.lastIndexOf('/') + 1);
        });
        setpackages(resp);        
      })
      .catch((error) => {
        console.log("Error log" + error);
        toast.error("Eror while getting packages data",{
          autoClose: 20000, // Adjust the time in milliseconds (e.g., 8000ms = 8 seconds)
        });
      });
  };
  const viewpkg = (packageId) => {
    console.log(packageId + " View");
    localStorage.setItem("packageId",packageId);
    navigate(`/allpackages/UViewPkg/${packageId}`);

  };
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

  const handleChange = (event, property) => {
      setpkdata({ ...pkdata, [property]: event.target.value });
  };
  const isValidPkgData = (pkdata) => {
    var invalidCount = 0;
    if (pkdata.fromCity === pkdata.destinationCity) {
      invalidCount++;
      toast.error("From city & destination city can't be same", {
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
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error log" + error);
        toast.error("Eror while adding data to flight", {
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
    <Base>
    <Section id="recommend">
    <form>
        <div className="search">
        <div className="container">
            <b><label htmlFor="">Source</label></b>
            <select name="fromCity" value={localStorage.getItem('fromCity')} onChange={(e) => handleChange(e, "fromCity")} style={{backgroundColor:"transparent",border:"transparent"}}>          
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
            <select name="destinationCity" value={localStorage.getItem('destinationCity')} onChange={(e) => handleChange(e, "destinationCity")}style={{backgroundColor:"transparent",border:"transparent"}}>
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
            <input type="date" value={localStorage.getItem('checkin')}  name="checkin" />
          </div>
          <div className="container">
            <b><label htmlFor="">Check-out</label></b>
            <input type="date" value={localStorage.getItem('checkout')} name="checkout"/>
          </div>
          <b><button type="submit" onClick={pkgview}>Go</button></b>
        </div>
        </form>
        <br></br>
    
    <div className="destinations">
        {packages.map((destination) => {
          return (
            <button className="destination" onClick={() => viewpkg(destination.packageId)}>
              <img src={destination.imgPath} alt="" height={200} width={100} />
              <h3><b>{destination.pkgName}</b></h3>
              <div className="info">
                <div className="services">
                  <img src={info1} alt="" />
                  <img src={info2} alt="" />
                  <img src={info3} alt="" />
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div>
                  <br></br>
                <h5>INR {destination.packageBaseRate}*/-</h5>
                <h6 style={{ fontSize:12}}>Per Person</h6>
                <i><h6 style={{ fontSize:8}}>*(Exclusive Of Flight if present)</h6></i>
                </div>
              </div>
              <div className="distance">
                <i><b>Approx {destination.noOfNights} nights</b></i>
              </div>
              {/* <button
                          color="primary"
                          onClick={() => viewpkg(destination.packageId)}
                        >
                          View
                        </button> */}
            </button>
          );
        })}
      </div>
      </Section>
      </Base>
  );
};
export default AllPackages;
const Section = styled.section`
  padding: 2rem 0;
  .search {
    display: flex;
    background-color:   #ffcccc;
    margin-left:3.2rem;
    margin-right:3.2rem;
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
  .destinations {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    padding: 0 3rem;
    .destination {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      background-color: #8338ec14;
      border-radius: 1rem;
      transition: 0.3s ease-in-out;
      &:hover {
        transform: translateX(0.4rem) translateY(-1rem);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
      img {
        width: 100%;
      }
      .info {
        display: flex;
        align-items: center;
        .services {
          display: flex;
          gap: 0.3rem;
          img {
            border-radius: 4rem;
            background-color: #4d2ddb84;
            width: 2rem;
            /* padding: 1rem; */
            padding: 0.3rem 0.4rem;
          }
        }
        display: flex;
        justify-content: space-between;
      }
      .distance {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 768px) {
    .packages {
      ul {
        li {
          padding: 0 0.5rem;
          font-size: 2vh;
          padding-bottom: 1rem;
        }
        .active {
          border-bottom-width: 0.3rem;
        }
      }
    }
    .destinations {
      grid-template-columns: 1fr;
      padding: 0;
    }
  }
`;
